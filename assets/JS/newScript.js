navigator.geolocation.getCurrentPosition((position) => {
    const result = getNearestCity(
      position.coords.latitude,
      position.coords.longitude
    )
    console.log(result)
    // { cityName: 'Oujda', countryIso2: 'MA', countryName: 'Morocco' }
  })

const coords = new adhan.Coordinates(34.6867, -1.9114);
const date = new Date(2026, 3, 1);
const params = adhan.CalculationMethod.MuslimWorldLeague();
const times = new adhan.PrayerTimes(coords, date, params);

console.log('Fajr:',    times.fajr.toLocaleTimeString());
console.log('Sunrise:', times.sunrise.toLocaleTimeString());
console.log('Dhuhr:',   times.dhuhr.toLocaleTimeString());
console.log('Asr:',     times.asr.toLocaleTimeString());
console.log('Maghrib:', times.maghrib.toLocaleTimeString());
console.log('Isha:',    times.isha.toLocaleTimeString());