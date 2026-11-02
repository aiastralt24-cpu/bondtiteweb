import { test, expect } from '@playwright/test';

const products = [
  ['bondtite-quick-instant-adhesive', 'B0FL7BF3F2', '3 g × 2 tubes'],
  ['bondtite-quick-spot-on', 'B0FG36CJ1R', '10 g × 2 tubes'],
  ['bondtite-quick-gel-adhesive', 'B0FL7BF84P', '3 g × 2 tubes'],
  ['bondtite-quick-art-and-craft-glue', 'B0FG3CD2B4', '10 g tube'],
  ['bondtite-quick-ultra-glue-brush-and-nozzle', 'B0FG38J6VC', '15 g bottle']
];

for (const [slug, asin, pack] of products) {
  test(`${slug} links to the matching Amazon pack`, async ({ page }) => {
    await page.goto(`/products/cyanoacrylates/${slug}`);
    const purchase = page.locator('#instant-purchase');
    await expect(purchase).toContainText(pack);
    await expect(purchase.getByRole('link', { name: /Buy .* on Amazon/ })).toHaveAttribute('href', `https://www.amazon.in/dp/${asin}`);
    await expect(purchase.getByRole('link', { name: /Buy .* on Amazon/ })).toHaveAttribute('target', '_blank');
    await page.getByRole('button', { name: 'Application detail', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Application detail', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#quick-video')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Product video', exact: true })).toHaveCount(0);
  });
}

test('mobile purchase bar works after a section jump and returns out of view at the hero', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/products/cyanoacrylates/bondtite-quick-gel-adhesive');
  await expect(page.locator('.instant-buybar')).toBeHidden();
  await page.getByRole('navigation', { name: 'Product sections' }).getByRole('link', { name: 'Instructions', exact: true }).click();
  await expect(page.locator('.instant-buybar')).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(page.locator('.instant-buybar')).toBeHidden();
});

test('standard Quick retains enquiry and no mismatched Amazon purchase', async ({ page }) => {
  await page.goto('/products/cyanoacrylates/bondtite-quick');
  await expect(page.getByRole('link', { name: 'Enquire about this product', exact: true })).toBeVisible();
  await expect(page.locator('main a[href*="amazon.in"]')).toHaveCount(0);
});

test('original artwork enlarges, zooms and returns keyboard focus without page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/products/cyanoacrylates/bondtite-quick-ultra-glue-brush-and-nozzle');
  const instructions = page.getByRole('button', { name: 'Pack instructions', exact: true });
  await instructions.click();
  await expect(instructions).toHaveAttribute('aria-pressed', 'true');
  const enlarge = page.getByRole('button', { name: 'Enlarge pack instructions', exact: true });
  await enlarge.click();
  const dialog = page.getByRole('dialog', { name: 'Pack instructions enlarged' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await expect(dialog.getByRole('button', { name: 'Fit image' })).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(enlarge).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
