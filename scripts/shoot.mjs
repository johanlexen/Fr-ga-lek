import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/home/user/Fr-ga-lek/preview";
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// [filename, section id (or null = top), extra px nudge past the section top]
const SHOTS = [
  ["01-hero", null, 0],
  ["02-story", "story", 900],
  ["03-spatial", "spatial", -20],
  ["04-transform", "transform", 1400],
  ["05-ecosystem", "ecosystem", 120],
  ["06-motion", "motion", 60],
  ["07-visuals", "visuals", 60],
  ["08-finale", "finale", 200],
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

await page.goto("http://localhost:3210", { waitUntil: "networkidle" });
// let the preloader finish + fonts settle
await sleep(3500);

for (const [name, id, nudge] of SHOTS) {
  const y = await page.evaluate(
    ([sid, n]) => {
      if (!sid) return 0;
      const el = document.getElementById(sid);
      return el ? el.getBoundingClientRect().top + window.scrollY + n : 0;
    },
    [id, nudge]
  );
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  // wait for in-view reveals + scroll-linked transforms to settle
  await sleep(1300);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log("shot", name, "@", Math.round(y));
}

await browser.close();
console.log("done");
