import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseURL = process.env.QA_URL ?? "http://127.0.0.1:4173/loraniq-admin/";
const outputDir = path.resolve("artifacts/qa");
await fs.mkdir(outputDir, { recursive: true });

const routes = [
  { name: "executive", path: "" },
  { name: "analytics", path: "analytics/" },
  { name: "ecommerce", path: "ecommerce/" },
  { name: "crm", path: "crm/" },
  { name: "finance", path: "finance/" },
  { name: "healthcare", path: "healthcare/" },
];
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
const failures = [];

async function checkOverflow(page, label) {
  const overflow = await page.evaluate(() => ({ documentWidth: document.documentElement.scrollWidth, viewportWidth: document.documentElement.clientWidth }));
  if (overflow.documentWidth > overflow.viewportWidth + 1) failures.push(`${label}: horizontal overflow ${overflow.documentWidth}px > ${overflow.viewportWidth}px`);
}

for (const route of routes) {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    const consoleErrors = [];
    const failedRequests = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    page.on("requestfailed", (request) => {
      const errorText = request.failure()?.errorText ?? "failed";
      if (request.method() === "HEAD" && errorText.includes("ERR_ABORTED")) return;
      failedRequests.push(`${request.method()} ${request.url()} :: ${errorText}`);
    });

    const url = new URL(route.path, baseURL).toString();
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    const label = `${route.name}/${viewport.name}`;
    if (!response?.ok()) failures.push(`${label}: page response ${response?.status() ?? "none"}`);
    await page.locator("#main-content").waitFor({ state: "visible" });
    await page.getByRole("heading", { level: 1 }).first().waitFor({ state: "visible" });

    const initialDirection = await page.locator("html").getAttribute("dir");
    if (initialDirection !== "rtl") failures.push(`${label}: default direction is ${initialDirection ?? "missing"}, expected rtl`);
    if (await page.locator("html").evaluate((node) => node.classList.contains("dark"))) failures.push(`${label}: default state unexpectedly starts in dark mode`);

    if (route.name === "ecommerce") {
      await page.getByRole("button", { name: "سفارش", exact: true }).click();
      await page.getByText("۳٬۸۴۲ سفارش", { exact: true }).waitFor({ state: "visible" });
      await page.getByRole("button", { name: "درآمد", exact: true }).click();
    }
    if (route.name === "crm") {
      await page.getByRole("button", { name: "ارزش مشتری", exact: true }).click();
      await page.getByText("۴٫۸ میلیون", { exact: true }).waitFor({ state: "visible" });
      await page.getByRole("button", { name: "حفظ مشتری", exact: true }).click();
    }
    if (route.name === "finance") {
      await page.getByRole("button", { name: "سود عملیاتی", exact: true }).click();
      await page.getByText("۱۸۶٫۵ میلیون", { exact: true }).waitFor({ state: "visible" });
      await page.getByRole("button", { name: "جریان نقدی", exact: true }).click();
    }
    if (route.name === "healthcare") {
      await page.getByRole("button", { name: "زمان انتظار", exact: true }).click();
      await page.getByText("۱۹ دقیقه", { exact: true }).waitFor({ state: "visible" });
      await page.getByRole("button", { name: "جریان مراجعه", exact: true }).click();
    }

    await checkOverflow(page, `${label}/rtl-light`);
    await page.screenshot({ path: path.join(outputDir, `${route.name}-${viewport.name}-rtl-light.png`), fullPage: true });

    await page.getByRole("button", { name: "تغییر پوسته" }).click();
    if (!(await page.locator("html").evaluate((node) => node.classList.contains("dark")))) failures.push(`${label}: dark-mode toggle did not update <html>`);
    await page.getByRole("button", { name: "تغییر جهت و زبان" }).click();
    const direction = await page.locator("html").getAttribute("dir");
    if (direction !== "ltr") failures.push(`${label}: RTL/LTR toggle did not switch to ltr`);
    await checkOverflow(page, `${label}/ltr-dark`);

    await page.keyboard.press("Control+K");
    const commandInput = page.getByPlaceholder("نام صفحه یا عملیات را بنویسید...");
    await commandInput.waitFor({ state: "visible" });
    const commandQuery = route.name === "healthcare" ? "Healthcare" : route.name === "finance" ? "Finance" : route.name === "crm" ? "CRM" : "Ecommerce";
    await commandInput.fill(commandQuery);
    await page.keyboard.press("Escape");
    await commandInput.waitFor({ state: "hidden" });

    if (viewport.name === "mobile") {
      await page.getByRole("button", { name: "باز کردن منو" }).click();
      const sidebar = page.getByRole("complementary", { name: "ناوبری اصلی" });
      const closeButton = sidebar.getByRole("button", { name: "بستن منو" });
      await closeButton.waitFor({ state: "visible" });
      if (!(await sidebar.evaluate((node) => node.classList.contains("is-open")))) failures.push(`${label}: mobile sidebar did not open`);
      await closeButton.click();
      await page.waitForFunction(() => !document.querySelector("aside.sidebar")?.classList.contains("is-open"));
      await page.getByRole("button", { name: "بستن منو" }).first().waitFor({ state: "hidden" }).catch(() => undefined);
    }

    await page.screenshot({ path: path.join(outputDir, `${route.name}-${viewport.name}-ltr-dark.png`), fullPage: true });
    if (consoleErrors.length) failures.push(`${label}: console errors: ${consoleErrors.join(" | ")}`);
    if (failedRequests.length) failures.push(`${label}: failed requests: ${failedRequests.join(" | ")}`);
    await page.close();
  }
}

await browser.close();
if (failures.length) {
  console.error("Loraniq Pages QA failed:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log(`Loraniq Pages QA passed for ${routes.length} routes × ${viewports.length} viewports in RTL/light and LTR/dark at ${baseURL}`);
