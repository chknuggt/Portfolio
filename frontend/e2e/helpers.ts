import type { Page } from "@playwright/test";

export async function loginToDesktop(page: Page) {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  // Lock screen — click "Click to Start"
  await page.getByText("Click to Start").click();

  // Login screen — click "login" button
  await page.getByText("login").click();

  // Wait for dock to appear (desktop loaded)
  await page.waitForSelector(".dock", { timeout: 15000 });

  // Hover dock to prevent auto-hide race condition
  await page.locator(".dock").hover();
}
