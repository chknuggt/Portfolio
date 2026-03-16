import { test, expect } from "@playwright/test";
import { loginToDesktop } from "./helpers";

test.describe("App tests", () => {
  test.beforeEach(async ({ page }) => {
    await loginToDesktop(page);
  });

  test("Bear app shows sidebar with notes", async ({ page }) => {
    await page.locator("#dock-bear").click();

    const bearWindow = page.locator("#window-bear");
    await expect(bearWindow).toBeVisible({ timeout: 5000 });

    await expect(bearWindow.getByText("Profile")).toBeVisible();
    await expect(
      bearWindow.getByText("Projects", { exact: true })
    ).toBeVisible();
  });

  test("Terminal app shows prompt", async ({ page }) => {
    await page.locator("#dock-terminal").click();

    const termWindow = page.locator("#window-terminal");
    await expect(termWindow).toBeVisible({ timeout: 5000 });

    await expect(
      termWindow.getByText("@marioselef", { exact: false })
    ).toBeVisible();
  });

  test("Safari app shows bookmarks", async ({ page }) => {
    await page.locator("#dock-safari").click();

    const safariWindow = page.locator("#window-safari");
    await expect(safariWindow).toBeVisible({ timeout: 5000 });

    await expect(safariWindow.getByText("SNS Links")).toBeVisible();
  });

  test("multiple windows can be open simultaneously", async ({ page }) => {
    await page.locator("#dock-bear").click();
    await expect(page.locator("#window-bear")).toBeVisible({ timeout: 5000 });

    await page.locator(".dock").hover();
    await page.locator("#dock-terminal").click();
    await expect(page.locator("#window-terminal")).toBeVisible({
      timeout: 5000,
    });

    // Both should still be visible
    await expect(page.locator("#window-bear")).toBeVisible();
    await expect(page.locator("#window-terminal")).toBeVisible();
  });
});
