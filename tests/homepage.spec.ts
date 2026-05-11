import { expect, test } from "@playwright/test";

test("renders the homepage sections from fallback content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /The bond that holds India/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What are you bonding?" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Product range/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Built for every application/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: /Everything trade needs/i })
  ).toBeVisible();
});

test("updates the Bond Finder recommendation", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Metal / stone" }).click();
  await page.getByRole("button", { name: "Heat exposed" }).click();
  await page.getByRole("button", { name: "Same day" }).click();

  await expect(page.locator(".recommendation h3")).toHaveText("Bondtite Rapid");
});

test("FAQ rows expand with native keyboard-accessible disclosure", async ({ page }) => {
  await page.goto("/");

  const question = page.getByText("Are Bondtite PVA products safe indoors?");
  await question.click();

  await expect(page.getByText(/single-component and low odour/i)).toBeVisible();
});
