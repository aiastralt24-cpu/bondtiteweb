import { expect, test } from '@playwright/test';

test('hero background playback can be paused and resumed', async ({ page }) => {
  await page.goto('/');
  const background = page.locator('video.campaign-hero__video');
  await expect(background).toHaveAttribute('src', /mp4/);
  expect(await background.evaluate(video => (video as HTMLVideoElement).muted)).toBe(true);
  await page.getByRole('button', { name: 'Pause background video' }).click();
  expect(await background.evaluate(video => (video as HTMLVideoElement).paused)).toBe(true);
  await page.getByRole('button', { name: 'Play background video' }).click();
  await expect.poll(() => background.evaluate(video => (video as HTMLVideoElement).paused)).toBe(false);
});

test('bonding steps and product handoff keep navigation usable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(page.locator('.material-story__visual')).toHaveClass(/--apply/);
  await page.getByRole('button', { name: 'Press', exact: true }).click();
  await expect(page.locator('.material-story__visual')).toHaveClass(/--press/);
  await page.locator('.featured-range__item').first().click();
  await expect(page).toHaveURL(/\/products\/woodworking\/bondtite-hydra$/);
  await expect(page.locator('h1')).toHaveText('Hydra+');
  await expect(page.locator('.product-handoff')).toHaveCount(0);
  await page.goBack();
  await expect(page.locator('.campaign-hero__video')).toBeAttached();
});

test('reduced motion keeps materials and navigation available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.campaign-hero__video')).not.toHaveAttribute('src');
  await page.getByText('Read all three steps', { exact: true }).click();
  await expect(page.locator('.material-story__all')).toContainText('Coat the less porous surface first');
  await page.locator('.featured-range__item').first().click();
  await expect(page.locator('h1')).toHaveText('Hydra+');
  await expect(page.locator('.product-handoff')).toHaveCount(0);
});

test('background pauses offscreen and hero stays within the viewport width', async ({ page, isMobile }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Bondtite.Lakadi ka Chumbak.');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (isMobile) {
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeFocused();
  }
  await page.locator('.featured-range__item').first().scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.campaign-hero__video').evaluate(video => (video as HTMLVideoElement).paused)).toBe(true);
  await expect(page.locator('.campaign-product')).toHaveCount(0);
});
