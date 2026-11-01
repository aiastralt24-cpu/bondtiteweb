import { test, expect } from '@playwright/test';

test('homepage navigation, application steps, guide and product route', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle(/Bondtite/);
  await expect(page.locator('.featured-range__item')).toHaveCount(4);
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Main menu' })).toBeVisible();
  await page.locator('.site-menu').evaluate(element => element.scrollTo(0, element.scrollHeight));
  await page.locator('.site-menu__top button').click();
  await expect(page.getByRole('dialog', { name: 'Main menu' })).not.toBeVisible();
  const story = page.locator('.material-story');
  await story.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(story.locator('.material-story__visual')).toHaveClass(/--apply/);
  await story.getByRole('button', { name: 'Press', exact: true }).click();
  await expect(story.locator('.material-story__visual')).toHaveClass(/--press/);
  await story.locator('summary').click();
  await expect(story.locator('details')).toHaveAttribute('open', '');
  await expect(story.locator('.material-story__instructions')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.featured-range__item').first().click();
  await expect(page).toHaveURL(/products\/woodworking\/bondtite-hydra$/);
  await expect(page.locator('h1')).toHaveText(/HYDRA\+/i);
  await expect(page.locator('.product-route-snapshot')).toHaveCount(0);
  await page.goBack();
  await expect(page.locator('.featured-range__item')).toHaveCount(4);
  expect(errors).toEqual([]);
});

test('product anchors, FAQs, layouts and enquiry form controls', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const path of ['/products/woodworking/bondtite-hydra', '/products/epoxy-adhesives/bondtite-fast-and-clear']) {
    await page.goto(path);
    await page.locator('.product-section-nav a[href="#product-questions"]').click();
    await expect(page.locator('.product-section-nav a[aria-current="location"]')).toHaveText('FAQs');
    await page.locator('#product-questions summary').first().click();
    await expect(page.locator('#product-questions details').first()).toHaveAttribute('open', '');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('link', { name: 'Enquire about this product', exact: true }).click();
    await expect(page).toHaveURL(/contact\?product=/);
    await expect(page.locator('#enquiry-product')).not.toHaveValue('');
  }
  await page.getByLabel('Your name').fill('Compatibility test');
  await page.getByLabel('Mobile number').fill('9876543210');
  await page.getByLabel('Enquiry type').selectOption({ label: 'Product selection' });
  await page.getByLabel('Application or project details').fill('Checking form controls without submitting.');
  await page.getByText('Add optional details', { exact: true }).click();
  await page.getByLabel('Email address').fill('test@example.com');
  await expect(page.getByLabel('Email address')).toHaveValue('test@example.com');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('advisor returns products for selected materials', async ({ page }) => {
  await page.goto('/product-advisor');
  await page.getByRole('radio', { name: /Something else/ }).check();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('group', { name: 'First material', exact: true }).getByRole('radio', { name: 'Wood', exact: true }).check();
  await page.getByRole('group', { name: 'Second material', exact: true }).getByRole('radio', { name: 'MDF', exact: true }).check();
  await page.getByRole('button', { name: 'Show my products' }).click();
  await expect(page.locator('.task-advisor__recommendations h3').first()).toHaveText('Bondtite Hydra+');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('reduced motion preserves manual steps without pinning or autoplay', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.campaign-hero__video')).not.toHaveAttribute('src');
  await page.locator('.material-story').getByRole('button', { name: 'Press', exact: true }).click();
  await expect(page.locator('.material-story__visual')).toHaveClass(/--press/);
  await expect(page.locator('.material-story')).not.toHaveAttribute('data-cinematic');
});
