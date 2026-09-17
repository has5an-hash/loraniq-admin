import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseURL = process.env.QA_URL ?? "http://127.0.0.1:4173/loraniq-admin/";
const outputDir = path.resolve("artifacts/qa");
await fs.mkdir(outputDir, { recursive: true });

const cases = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
const failures = [];

for (const testCase of cases) {
  const page = await browser.newPage({ viewport: testCase });
  const consoleErrors = [];
  const failedRequests = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText ?? "failed"}`);
  });

  const response = await page.goto(baseURL, { waitUntil: "networkidle", timeout: 60_000 });
  if (!response?.ok()) failures.push(`${testCase.name}: page response ${response?.status() ?? "none"}`);

  await page.locator("#main-content").waitFor({ state: "visible" });
  await page.getByRole("heading", { level: 1 }).first().waitFor({ state: "visible" });

  await page.getByRole("button", { name: "تغییر پوسته" }).click();
  if (!(await page.locator("html").evaluate((node) => node.classList.contains("dark")))) {
    failures.push(`${testCase.name}: dark-mode toggle did not update <html>`);
  }

  await page.getByRole("button", { name: "تغییر جهت و زبان" }).click();
  const direction = await page.locator("html").getAttribute("dir");
  if (direction !== "ltr") failures.push(`${testCase.name}: RTL/LTR toggle did not switch to ltr`);

  await page.keyboard.press("Control+K");
  const commandInput = page.getByPlaceholder("نام صفحه یا عملیات را بنویسید...");
  await commandInput.waitFor({ state: "visible" });
  await commandInput.fill("Analytics");
  await page.keyboard.press("Escape");

  if (testCase.name === "mobile") {
    await page.getByRole("button", { name: "باز کردن منو" }).click();
    await page.getByRole("button", { name: "بستن منو" }).waitFor({ state: "visible" });
    await page.getByRole("button", { name: "بستن منو" }).click();
  }

  await page.screenshot({
    path: path.join(outputDir, `${testCase.name}.png`),
    fullPage: true,
  });

  if (consoleErrors.length) failures.push(`${testCase.name}: console errors: ${consoleErrors.join(" | ")}`);
  if (failedRequests.length) failures.push(`${testCase.name}: failed requests: ${failedRequests.join(" | ")}`);

  await page.close();
}

await browser.close();

if (failures.length) {
  console.error("Loraniq Pages QA failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(`Loraniq Pages QA passed for ${cases.length} viewports at ${baseURL}`);
