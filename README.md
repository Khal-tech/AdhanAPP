# Adhan APP 🕌

A web-based Islamic prayer times application providing accurate Adhan schedules for users worldwide, with special support for Morocco using official Ministère des Habous calculation parameters.

---

## Features

- 🌍 **Worldwide prayer times** — automatic geolocation detects the user's position and fetches accurate prayer times for any country
- 🇲🇦 **Morocco-specific calculation** — uses the official parameters of the Moroccan Ministère des Habous (Fajr: 18°, Isha: 17°) via the AlAdhan API
- 📍 **Geolocation-based** — no manual city input required; the app locates the user automatically
- ⚡ **Lightweight & fast** — built with vanilla JavaScript, no heavy frameworks

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Prayer Calculation | [Adhan.js](https://github.com/batoulapps/adhan-js) |
| Prayer Times API | [AlAdhan API](https://aladhan.com/prayer-times-api) |
| Geolocation | Browser Geolocation API + [BigDataCloud](https://www.bigdatacloud.com/) reverse geocoding |

## How It Works

1. On load, the app requests the user's GPS coordinates via the browser Geolocation API
2. Coordinates are sent to BigDataCloud to retrieve the country
3. **If Morocco:** the AlAdhan API is called with Habous-compliant calculation parameters
4. **If elsewhere:** Adhan.js computes prayer times using standard astronomical calculations
5. Times are displayed dynamically on the interface

## Status

> 🚧 **Work in progress**

| Feature | Status |
|---|---|
| Geolocation | ✅ Working |
| Prayer times display | ✅ Working |
| Morocco (Habous) calculation | ✅ Working |
| Worldwide fallback | ✅ Working |
| UI feature buttons | 🔧 Under development |
| Offline mode | 📋 Planned |

## Author

**Khalil Yachou** — [linkedin.com/in/khalil-yachou](https://linkedin.com/in/khalil-yachou)  
Built as a personal project alongside studies at EHEI, Oujda, Morocco.
