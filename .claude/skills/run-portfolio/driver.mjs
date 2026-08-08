// Playwright smoke driver for the terminal-themed portfolio (a static Next.js SPA).
//
// It launches headless chromium, points it at an already-running server, and
// drives the real UI: loads the page, clicks through all five terminal tabs,
// switches the colour theme, and screenshots each step. It asserts on the DOM
// (HTTP ok, header present, `html[data-theme]` flips) and prints a PASS/FAIL
// summary, exiting non-zero if anything failed — so it works as a smoke test too.
//
// This driver does NOT start a server. Bring one up first (see SKILL.md):
//   prod : bun run build && python3 -m http.server -d out 8000   (default)
//   dev  : bun dev                                               (--url http://localhost:3000)
//
// Usage:
//   node driver.mjs                                  # http://localhost:8000, shots in /tmp/portfolio-shots
//   node driver.mjs --url http://localhost:3000      # drive the dev server instead
//   node driver.mjs --theme cyberpunk --out /tmp/x   # pick theme + screenshot dir
//
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};

const BASE_URL = opt("url", process.env.BASE_URL || "http://localhost:8000");
const OUT_DIR = opt("out", process.env.SHOT_DIR || "/tmp/portfolio-shots");
const THEME = opt("theme", "cyberpunk"); // green | pink | blue | light | synthwave | cyberpunk
const TABS = ["about", "education", "experience", "projects", "socials"];

mkdirSync(OUT_DIR, { recursive: true });

const results = [];
const check = (name, ok, detail = "") => {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 850 } });

// Treat uncaught page errors / console errors as failures.
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => m.type() === "error" && errors.push(`console: ${m.text()}`));

try {
  const resp = await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
  check("page loads (HTTP ok)", !!resp && resp.ok(), `status ${resp && resp.status()} @ ${BASE_URL}`);

  // Provider sets data-theme on <html> after hydration — proves JS booted.
  await page.waitForSelector("html[data-theme]", { timeout: 10000 });
  await page.getByText("james_gray").first().waitFor({ timeout: 10000 });
  check("app hydrated", true, "header + data-theme present");

  // The five tabs are the only `font-bold` buttons; click each by index, screenshot.
  const tabs = page.locator("button.font-bold");
  const tabCount = await tabs.count();
  check("tab bar has 5 tabs", tabCount === TABS.length, `found ${tabCount}`);
  for (let i = 0; i < TABS.length; i++) {
    await tabs.nth(i).click();
    await page.waitForTimeout(450); // let the tab's content mount
    const file = join(OUT_DIR, `tab-${i}-${TABS[i]}.png`);
    await page.screenshot({ path: file });
    check(`tab: ${TABS[i]}`, true, file);
  }

  // Theme switch: open the [theme] menu, pick THEME, confirm <html> + button label flip.
  await page.getByRole("button", { name: "Change theme" }).click();
  await page.getByRole("button", { name: THEME, exact: true }).click();
  await page.waitForSelector(`html[data-theme="${THEME}"]`, { timeout: 5000 });
  const label = (await page.getByRole("button", { name: "Change theme" }).textContent())?.trim();
  check(`theme → ${THEME}`, label === `[${THEME}]`, `button reads "${label}"`);
  const themeShot = join(OUT_DIR, `theme-${THEME}.png`);
  await page.screenshot({ path: themeShot });
  check("theme screenshot", true, themeShot);

  check("no page/console errors", errors.length === 0, errors.slice(0, 3).join(" | "));
} catch (err) {
  check("driver run", false, err.message);
} finally {
  await browser.close();
}

const passed = results.filter(Boolean).length;
console.log(`\n${passed}/${results.length} checks passed — screenshots in ${OUT_DIR}`);
process.exit(passed === results.length ? 0 : 1);
