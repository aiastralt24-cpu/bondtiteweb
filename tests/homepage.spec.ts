import { expect, test } from "@playwright/test";

test("renders the homepage sections from fallback content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /The bond that holds India/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What are you bonding?" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /A different bond/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /What are you working on/i })).toBeVisible();
});

test("updates the Bond Finder recommendation", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Metal / stone" }).click();
  await page.getByRole("button", { name: "Heat exposed" }).click();
  await page.getByRole("button", { name: "Same day" }).click();

  await expect(page.locator(".recommendation h3")).toHaveText(/Bondtite Rapid/i);
});



test("homepage keeps one story and a compact range", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".range-stage")).toHaveCount(0);
  await expect(page.locator(".featured-range__item")).toHaveCount(4);
  await expect(page.getByRole("button", { name: "Play the film" })).toBeVisible();
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await expect(page.locator(".material-story__description")).toContainText("less porous surface first");
});
