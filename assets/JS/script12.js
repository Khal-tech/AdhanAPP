"use strict";

var wrapperBackground = document.getElementById("wrapperBackground");
var img = document.getElementById("img");
var mainBody = document.getElementById("mainBody");

mainBody.style.visibility = "hidden";
mainBody.style.opacity = "0";

// State
var currentBackgroundUrl = "";
var currentImgBackgroundUrl = "";
var prayerTimings = null;
var prayerDateInfo = null;
var geoData = null;
var tickInterval = null;
var mainShown = false;

// ─── Helpers ────────────────────────────────────────────────────────────────

function timeToMinutes(t) {
  var parts = t.split(":");
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function changeWrapperBackground(newImageUrl) {
  if (newImageUrl === currentBackgroundUrl) return;
  currentBackgroundUrl = newImageUrl;
  wrapperBackground.style.opacity = "0";
  setTimeout(function () {
    wrapperBackground.style.backgroundImage = "url('" + newImageUrl + "')";
    wrapperBackground.style.opacity = "1";
  }, 500);
}

function changeImgBackground(newImageUrl) {
  if (newImageUrl === currentImgBackgroundUrl) return;
  currentImgBackgroundUrl = newImageUrl;
  img.style.opacity = "0";
  setTimeout(function () {
    img.style.backgroundImage = "url('" + newImageUrl + "')";
    img.style.opacity = "1";
  }, 500);
}

function showMainBody() {
  if (mainShown) return;
  mainShown = true;
  setTimeout(function () {
    var loader = document.getElementById("loader");
    mainBody.style.display = "block";
    mainBody.style.visibility = "visible";
    mainBody.style.opacity = "1";
    mainBody.style.transition =
      "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out";
    loader.style.visibility = "hidden";
    loader.style.opacity = "0";
    loader.style.transition =
      "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out";
  }, 2000);
}

// ─── Tick (runs every second, no network calls) ──────────────────────────────

function tick() {
  if (!prayerTimings) return;

  var today = new Date();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");
  var year = String(today.getFullYear());
  var hours = String(today.getHours()).padStart(2, "0");
  var minutes = String(today.getMinutes()).padStart(2, "0");
  var seconds = String(today.getSeconds()).padStart(2, "0");

  document.getElementById("currentTime").innerHTML =
    hours + ":" + minutes + ":" + seconds;

  var currentMinutes = parseInt(hours) * 60 + parseInt(minutes);

  var fajrMinutes = timeToMinutes(prayerTimings.Fajr);
  var sunriseMinutes = timeToMinutes(prayerTimings.Sunrise);
  var dhuhrMinutes = timeToMinutes(prayerTimings.Dhuhr);
  var asrMinutes = timeToMinutes(prayerTimings.Asr);
  var maghribMinutes = timeToMinutes(prayerTimings.Maghrib);
  var ishaMinutes = timeToMinutes(prayerTimings.Isha);

  // Next prayer
  var nextPrayerName;
  var nextPrayerValue;

  if (currentMinutes < fajrMinutes) {
    nextPrayerName = "Fajr";
    nextPrayerValue = prayerTimings.Fajr;
  } else if (currentMinutes < dhuhrMinutes) {
    nextPrayerName = "Dhuhr";
    nextPrayerValue = prayerTimings.Dhuhr;
  } else if (currentMinutes < asrMinutes) {
    nextPrayerName = "Asr";
    nextPrayerValue = prayerTimings.Asr;
  } else if (currentMinutes < maghribMinutes) {
    nextPrayerName = "Maghrib";
    nextPrayerValue = prayerTimings.Maghrib;
  } else if (currentMinutes < ishaMinutes) {
    nextPrayerName = "Isha";
    nextPrayerValue = prayerTimings.Isha;
  } else {
    nextPrayerName = "Fajr"; // tomorrow
    nextPrayerValue = prayerTimings.Fajr;
  }

  document.getElementById("nextPrayer").innerHTML = nextPrayerName;
  document.getElementById("nextPrayerTime").innerHTML = nextPrayerValue;

  // Countdown
  var isTomorrow = nextPrayerName === "Fajr" && currentMinutes >= ishaMinutes;
  var targetDay = isTomorrow ? parseInt(day) + 1 : parseInt(day);
  var countDownPrayer = new Date(
    parseInt(year),
    parseInt(month) - 1,
    targetDay,
    parseInt(nextPrayerValue.split(":")[0]),
    parseInt(nextPrayerValue.split(":")[1]),
    0,
  ).getTime();

  var distance = countDownPrayer - today.getTime();
  var prayerHours = String(
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  ).padStart(2, "0");
  var prayerMins = String(
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
  ).padStart(2, "0");
  var prayerSecs = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
    2,
    "0",
  );
  document.getElementById("remainingPrayerTime").innerHTML =
    prayerHours + ":" + prayerMins + ":" + prayerSecs;

  // Prayer time popup
  if (distance <= 1000 && distance > -1000) {
    document.getElementById("itsPrayerTimePopUp").style.display = "flex";
    document.getElementById("popUpPrayer").innerHTML = nextPrayerName;
  }

  // Background image (sunrise intentionally skipped in prayer label, kept in BG logic)
  var newImageUrl;
  if (currentMinutes <= fajrMinutes + 30) {
    newImageUrl = "assets/IMG/TIMES/fajr time.png";
  } else if (currentMinutes <= sunriseMinutes + 30) {
    newImageUrl = "assets/IMG/TIMES/sunrise time.png";
  } else if (currentMinutes < dhuhrMinutes + 75) {
    newImageUrl = "assets/IMG/TIMES/dhuhr time.png";
  } else if (currentMinutes < asrMinutes + 100) {
    newImageUrl = "assets/IMG/TIMES/asr time.png";
  } else if (currentMinutes < maghribMinutes - 10) {
    newImageUrl = "assets/IMG/TIMES/sunset time.png";
  } else if (currentMinutes < ishaMinutes - 40) {
    newImageUrl = "assets/IMG/TIMES/maghrib time.png";
  } else {
    newImageUrl = "assets/IMG/TIMES/isha time.png";
  }

  changeWrapperBackground(newImageUrl);
  changeImgBackground(newImageUrl);
}

// ─── Prayer times fetch (once per load) ─────────────────────────────────────

function fetchPrayerTimes(geo) {
  var today = new Date();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");
  var year = String(today.getFullYear());

  var prayerXhr = new XMLHttpRequest();
  prayerXhr.open(
    "GET",
    "https://api.aladhan.com/v1/timingsByAddress/" +
      day +
      "-" +
      month +
      "-" +
      year +
      "?address=" +
      encodeURIComponent(geo.city) +
      "," +
      encodeURIComponent(geo.countryCode),
  );
  prayerXhr.send();

  prayerXhr.onload = function () {
    if (prayerXhr.status !== 200) {
      console.error("Prayer API returned status", prayerXhr.status);
      return;
    }

    var prayerApi = JSON.parse(prayerXhr.responseText);
    prayerTimings = prayerApi.data.timings;
    prayerDateInfo = prayerApi.data.date;

    // Static UI — set once, not every second
    document.getElementById("geoInfos").innerHTML =
      geo.city + ", " + geo.countryName;

    var countryIcon = document.getElementById("countryIcon");
    countryIcon.className = ""; // reset before adding
    countryIcon.classList.add(
      "fi",
      "fi-" + String(geo.countryCode).toLowerCase(),
      "fis",
    );

    document.getElementById("Fajr").innerHTML = prayerTimings.Fajr;
    document.getElementById("Churuq").innerHTML = prayerTimings.Sunrise;
    document.getElementById("Dhuhr").innerHTML = prayerTimings.Dhuhr;
    document.getElementById("Asr").innerHTML = prayerTimings.Asr;
    document.getElementById("Maghrib").innerHTML = prayerTimings.Maghrib;
    document.getElementById("Isha").innerHTML = prayerTimings.Isha;

    document.getElementById("miladiCal").innerHTML =
      prayerDateInfo.gregorian.date;
    document.getElementById("hijriCal").innerHTML =
      prayerDateInfo.hijri.day +
      "-" +
      prayerDateInfo.hijri.month.en +
      "-" +
      prayerDateInfo.hijri.year;

    // Show app, then start the clock
    showMainBody();
    tick();
    tickInterval = setInterval(tick, 1000);
  };

  prayerXhr.onerror = function () {
    console.error("Prayer times network request failed");
  };
}

// ─── Reverse geocoding ───────────────────────────────────────────────────────

function reverseGeocode(latitude, longitude) {
  var url =
    "https://api.bigdatacloud.net/data/reverse-geocode-client" +
    "?latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&localityLanguage=en";

  var geoXhr = new XMLHttpRequest();
  geoXhr.open("GET", url);
  geoXhr.send();

  geoXhr.onload = function () {
    if (geoXhr.status === 200) {
      geoData = JSON.parse(geoXhr.responseText);
      fetchPrayerTimes(geoData);
    } else {
      console.error("Geocoding API returned status", geoXhr.status);
    }
  };

  geoXhr.onerror = function () {
    console.error("Geocoding network request failed");
  };
}

// ─── Popup dismiss ───────────────────────────────────────────────────────────

function removeFunc() {
  document.getElementById("itsPrayerTimePopUp").style.display = "none";
}

// ─── Geolocation entry point ─────────────────────────────────────────────────

function successCallback(position) {
  var lat = parseFloat(position.coords.latitude).toFixed(3);
  var lng = parseFloat(position.coords.longitude).toFixed(3);
  reverseGeocode(lat, lng);
}

function errorCallback(error) {
  var messages = {
    1: "Location permission denied.",
    2: "Location unavailable.",
    3: "Location request timed out.",
  };
  console.error("Geolocation error:", messages[error.code] || "Unknown error.");
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
