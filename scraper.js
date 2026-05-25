/**
 * Habous Prayer Times Scraper
 * ----------------------------
 * Scrapes prayer times for all Moroccan cities from habous.gov.ma
 * and saves the result to prayer_times.json
 *
 * Usage:
 *   npm install node-fetch cheerio
 *   node scraper.js
 */

const fs = require("fs");
const https = require("https");

// Ignore SSL certificate errors (habous.gov.ma has cert issues)
const agent = new https.Agent({ rejectUnauthorized: false });

// Dynamic import for node-fetch (ESM module)
async function fetchUrl(url) {
  const { default: fetch } = await import("node-fetch");
  const res = await fetch(url, { agent });
  return res.text();
}

// All 191 city IDs from habous.gov.ma (ville=1 to ville=191)
// Some IDs may return empty — those are skipped automatically
const TOTAL_CITIES = 191;
const BASE_URL = "https://www.habous.gov.ma/prieres/horaire-api.php?ville=";

// Prayer field names returned by the API
const PRAYER_KEYS = ["fajr", "shuruk", "dohr", "asr", "maghrib", "isha"];

function parseHtml(html, cityId) {
  // The habous API returns an HTML table, not JSON
  // We extract the city name and today's prayer times from it

  // Extract city name (Arabic)
  const cityMatch = html.match(/مدينة[:\s]*([\u0600-\u06FF\s]+)/);
  const cityName = cityMatch ? cityMatch[1].trim() : `Ville ${cityId}`;

  // Extract all time values (format HH:MM)
  const times = [...html.matchAll(/\b(\d{2}:\d{2})\b/g)].map((m) => m[1]);

  if (times.length < 6) return null; // skip empty/invalid pages

  return {
    id: cityId,
    city: cityName,
    prayers: {
      fajr: times[0] || null,
      shuruk: times[1] || null,
      dohr: times[2] || null,
      asr: times[3] || null,
      maghrib: times[4] || null,
      isha: times[5] || null,
    },
  };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function scrapeAll() {
  const results = [];
  let failed = 0;

  console.log(`Starting scrape for ${TOTAL_CITIES} cities...\n`);

  for (let id = 1; id <= TOTAL_CITIES; id++) {
    try {
      const html = await fetchUrl(`${BASE_URL}${id}`);
      const data = parseHtml(html, id);

      if (data) {
        results.push(data);
        console.log(`✅ [${id}/${TOTAL_CITIES}] ${data.city}`);
      } else {
        console.log(`⚠️  [${id}/${TOTAL_CITIES}] Skipped (no times found)`);
      }
    } catch (err) {
      console.log(`❌ [${id}/${TOTAL_CITIES}] Error: ${err.message}`);
      failed++;
    }

    // Small delay to avoid hammering the server
    await sleep(300);
  }

  const output = {
    source: "habous.gov.ma",
    scraped_at: new Date().toISOString(),
    total_cities: results.length,
    cities: results,
  };

  fs.writeFileSync(
    "prayer_times.json",
    JSON.stringify(output, null, 2),
    "utf-8",
  );

  console.log(`\n✅ Done! ${results.length} cities saved to prayer_times.json`);
  if (failed > 0) console.log(`⚠️  ${failed} cities failed.`);
}

scrapeAll();
