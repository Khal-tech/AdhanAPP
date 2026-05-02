var wrapperBackground = document.getElementById('wrapperBackground');
var img = document.getElementById('img');

var mainBody = document.getElementById('mainBody'); 

mainBody.style.visibility = 'hidden';
mainBody.style.opacity = '0';

// Reverse geocoding with BigDataCloud
function reverseGeocode(latitude, longitude) {
    console.log("Getting address for:", latitude, longitude);
    
    // Create the URL
    var url = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + latitude + "&longitude=" + longitude + "&localityLanguage=en";
    
    // Use XMLHttpRequest
    var geoXhr = new XMLHttpRequest();
    geoXhr.open("GET", url);
    geoXhr.send();

    geoXhr.onload = function() {
        if (geoXhr.status === 200) {

            var geoApi = JSON.parse(geoXhr.responseText);
            console.log(geoApi);
            // Show the results
            console.log("Success! Your location:");
            console.log("City:", geoApi.city || "N/A");
            console.log("State:", geoApi.principalSubdivision || "N/A");
            console.log("Country:", geoApi.countryName || "N/A");
            var currentBackgroundUrl = "";
            var currentImgBackgroundUrl = "";

            setInterval(() => {
            var today = new Date();
            var month = String(today.getMonth()+1).padStart(2, "0");
            var day = String(today.getDate()).padStart(2, "0");
            var year = String(today.getFullYear()); 
            var hours = String(today.getHours()).padStart(2, "0");
            var minutes = String(today.getMinutes()).padStart(2, "0");
            var seconds = String(today.getSeconds()).padStart(2, "0");

            var prayerXhr = new XMLHttpRequest(); 
            prayerXhr.open('GET','https://api.aladhan.com/v1/timingsByAddress/'+day+"-"+month+"-"+year+'?address='+geoApi.city+','+geoApi.countryCode);
            prayerXhr.send();

            prayerXhr.onload = () => {
                prayerApi = JSON.parse(prayerXhr.response);

                setTimeout(() => {
                    document.getElementById('mainBody').style.display = 'block';
                    document.getElementById('mainBody').style.visibility = 'visible';
                    document.getElementById('mainBody').style.opacity = '1';
                    document.getElementById('mainBody').style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';

                    document.getElementById('loader').style.visibility = 'hidden';
                    document.getElementById('loader').style.opacity = '0';
                    document.getElementById('loader').style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
                }, 2000);
                
                            
                var time = hours+":"+minutes+":"+seconds
                document.getElementById("currentTime").innerHTML = time;

                var geoInfos = document.getElementById("geoInfos");
                geoInfos.innerHTML = geoApi.city+", "+geoApi.countryName;

                var countryIcon = document.getElementById('countryIcon');
                countryIcon.classList.add(...("fi "+"fi-"+String(geoApi.countryCode).toLowerCase()+" fis").split(" "))

                // Convert current time to minutes for comparison
                var currentMinutes = parseInt(hours) * 60 + parseInt(minutes);
                
                // Convert prayer times to minutes for comparison
                function timeToMinutes(t) {
                    var parts = t.split(':');
                    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
                }

                var fajrMinutes = timeToMinutes(prayerApi.data.timings.Fajr);
                var sunriseMinutes = timeToMinutes(prayerApi.data.timings.Sunrise);
                var dhuhrMinutes = timeToMinutes(prayerApi.data.timings.Dhuhr);
                var asrMinutes = timeToMinutes(prayerApi.data.timings.Asr);
                var maghribMinutes = timeToMinutes(prayerApi.data.timings.Maghrib);
                var ishaMinutes = timeToMinutes(prayerApi.data.timings.Isha);

                // Determine current prayer and next prayer
                var currentPrayer = "";
                var nextPrayerValue = "";

                if (currentMinutes<fajrMinutes) {
                    currentPrayer = "Isha"; // Last prayer of previous day
                    nextPrayerValue = prayerApi.data.timings.Fajr;
                }
                else if (currentMinutes<dhuhrMinutes) {
                    currentPrayer = "Fajr";
                    nextPrayerValue = prayerApi.data.timings.Dhuhr;
                } else if (currentMinutes<asrMinutes) {
                    currentPrayer = "Dhuhr";
                    nextPrayerValue = prayerApi.data.timings.Asr;
                } else if (currentMinutes<maghribMinutes) {
                    currentPrayer = "Asr";
                    nextPrayerValue = prayerApi.data.timings.Maghrib;
                } else if (currentMinutes<ishaMinutes) {
                    currentPrayer = "Maghrib";
                    nextPrayerValue = prayerApi.data.timings.Isha;
                } else {
                    currentPrayer = "Isha";
                    nextPrayerValue = prayerApi.data.timings.Fajr; // Next day's Fajr
                }


                // Create separate functions for wrapper and img
                function changeWrapperBackground(newImageUrl) {
                    // Only change if different
                    if (newImageUrl === currentBackgroundUrl) {
                        return;
                    }
                    
                    currentBackgroundUrl = newImageUrl;
                    wrapperBackground.style.opacity = '0';
                    
                    setTimeout(function() {
                        wrapperBackground.style.backgroundImage = "url('" + newImageUrl + "')";
                        wrapperBackground.style.opacity = '1';
                    }, 500);
                }
                
                function changeImgBackground(newImageUrl) {
                    // Only change if different
                    if (newImageUrl === currentImgBackgroundUrl) {
                        return;
                    }
                    
                    currentImgBackgroundUrl = newImageUrl;
                    img.style.opacity = '0';
                    
                    setTimeout(function() {
                        img.style.backgroundImage = "url('" + newImageUrl + "')";
                        img.style.opacity = '1';
                    }, 500);
                }

                // Determine which image to show
                var newImageUrl = "";

                if (currentMinutes<=fajrMinutes+30) {
                    newImageUrl = "assets/IMG/TIMES/fajr\ time.png";
                }
                else if (currentMinutes<=sunriseMinutes+30) {
                    newImageUrl = "assets/IMG/TIMES/sunrise\ time.png";
                } 
                else if (currentMinutes<dhuhrMinutes+75) {
                    newImageUrl = "assets/IMG/TIMES/dhuhr\ time.png";
                } 
                else if (currentMinutes<asrMinutes+100) {
                    newImageUrl = "assets/IMG/TIMES/asr\ time.png";
                } 
                else if (currentMinutes<maghribMinutes-10) {
                    newImageUrl = "assets/IMG/TIMES/sunset\ time.png";
                }
                else if (currentMinutes<ishaMinutes-40) {
                    newImageUrl = "assets/IMG/TIMES/maghrib\ time.png";
                }
                else {
                    newImageUrl = "assets/IMG/TIMES/isha\ time.png";
                }

                // Apply fade transition to both backgrounds (only if image changed)
                changeWrapperBackground(newImageUrl);
                changeImgBackground(newImageUrl);

                // Get the name of the next prayer
                targetValuePrayer = Object.keys(prayerApi.data.timings).find(key => (prayerApi.data.timings)[key] === nextPrayerValue);
                // Update UI with current and next prayer
                document.getElementById('nextPrayer').innerHTML = targetValuePrayer;
                document.getElementById('nextPrayerTime').innerHTML = prayerApi.data.timings[targetValuePrayer];

                // Calculate countdown to next prayer
                var now = today.getTime();
                
                // Create date object for next prayer
                var countDownPrayer;
                if (targetValuePrayer == 'Fajr' && currentMinutes >= ishaMinutes) {
                    // If next is Fajr and we're after Isha, it's tomorrow
                    countDownPrayer = new Date(year, parseInt(month)-1, parseInt(day)+1, parseInt(nextPrayerValue.split(':')[0]), parseInt(nextPrayerValue.split(':')[1]), 0).getTime();
                } else {
                    countDownPrayer = new Date(year, parseInt(month)-1, parseInt(day), parseInt(nextPrayerValue.split(':')[0]), parseInt(nextPrayerValue.split(':')[1]), 0).getTime();
                }

                var distance = countDownPrayer - now;

                var prayerHours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
                var prayerMinutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
                var prayerSeconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");

                var remainingPrayerTime = document.getElementById('remainingPrayerTime');
                remainingPrayerTime.innerHTML = prayerHours + ':' + prayerMinutes + ':' + prayerSeconds;

                // Show popup when it's prayer time (within the first minute)
                if (distance <= 1000 && distance > -1000) {
                    var popUpPrayer = document.getElementById('popUpPrayer');
                    document.getElementById('itsPrayerTimePopUp').style.display = "flex";
                    popUpPrayer.innerHTML = targetValuePrayer;
                }

                var miladiCal = document.getElementById('miladiCal'); 
                var hijriCal = document.getElementById('hijriCal');

                miladiCal.innerHTML = prayerApi.data.date.gregorian.date;
                hijriCal.innerHTML = (prayerApi.data.date.hijri.day) + "-" + prayerApi.data.date.hijri.month.en + "-" + prayerApi.data.date.hijri.year;

                var fajrTime = document.getElementById("Fajr");
                var sunriseTime = document.getElementById("Churuq");
                var dhuhrTime = document.getElementById("Dhuhr");
                var asrTime = document.getElementById("Asr");
                var maghribTime = document.getElementById("Maghrib");
                var ishaTime = document.getElementById("Isha");
                

                fajrTime.innerHTML = prayerApi.data.timings.Fajr;
                sunriseTime.innerHTML = prayerApi.data.timings.Sunrise;
                dhuhrTime.innerHTML = prayerApi.data.timings.Dhuhr;
                asrTime.innerHTML = prayerApi.data.timings.Asr;
                maghribTime.innerHTML = prayerApi.data.timings.Maghrib;
                ishaTime.innerHTML = prayerApi.data.timings.Isha;
            }

            prayerXhr.onerror = () => {
                document.write('Network Request Failed');
            }
          }, 1000);
        };
    }
    
    geoXhr.onerror = function() {
        console.error("Network error - could not reach the API");
        console.log("Try opening this URL in your browser to test:", url);
    }; 
}

function removeFunc(){
    document.getElementById('itsPrayerTimePopUp').style.display = "none";
}

// Success callback
function successCallback(position) {
    var lat = parseFloat(position.coords.latitude).toFixed(3);
    var lng = parseFloat(position.coords.longitude).toFixed(3);
    console.log("Got your coordinates:", lat, lng);
    
    // Get the address
    reverseGeocode(lat, lng);
}

// Error callback
function errorCallback(error) {
    console.log("Could not get your location:");
    
    if (error.code === 1) {
        console.log("You denied permission. Please allow location access.");
    } else if (error.code === 2) {
        console.log("Location unavailable. Check your connection.");
    } else if (error.code === 3) {
        console.log("Location request timed out.");
    } else {
        console.log("Unknown error occurred.");
    }
}

// Start everything
console.log("Requesting your location...");
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);