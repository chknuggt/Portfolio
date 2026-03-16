import { test, expect } from "@playwright/test";
import { loginToDesktop } from "./helpers";

test.describe("Desktop smoke tests", () => {
  test("page loads without critical errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await loginToDesktop(page);

    const criticalErrors = errors.filter(
      (e) => !e.includes("WebGL") && !e.includes("THREE")
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("dock is visible on desktop", async ({ page }) => {
    await loginToDesktop(page);

    const dock = page.locator(".dock");
    await expect(dock).toBeVisible();
  });

  test("clicking dock icon opens a window", async ({ page }) => {
    await loginToDesktop(page);

    await page.locator("#dock-bear").click();

    const bearWindow = page.locator("#window-bear");
    await expect(bearWindow).toBeVisible({ timeout: 5000 });
  });

  test("window close button removes window", async ({ page }) => {
    await loginToDesktop(page);

    // Open Bear
    await page.locator("#dock-bear").click();
    const bearWindow = page.locator("#window-bear");
    await expect(bearWindow).toBeVisible({ timeout: 5000 });

    // Click close button (red traffic light)
    const closeBtn = bearWindow.locator(".window-btn").first();
    await closeBtn.click();

    // Window should be gone
    await expect(bearWindow).not.toBeVisible({ timeout: 3000 });
  });

  test("dark mode is off by default", async ({ page }) => {
    await loginToDesktop(page);

    const hasDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(hasDark).toBe(false);
  });
});
