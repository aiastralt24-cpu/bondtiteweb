import { expect, test } from '@playwright/test';
import rows from '../lib/product-selector-data.json';
import { compatibleMaterials, matchingProducts, selectorMaterials, selectorProductSlug } from '../lib/product-selector';
import { selectorGuidance } from '../lib/selector-guidance';
import { tdsDocuments } from '../lib/documents';

test('all source pairs work in both directions with original priorities and no inferred pairs', () => {
  expect(rows).toHaveLength(140);
  expect(selectorMaterials).toHaveLength(17);
  for (const row of rows) {
    const [a, b] = row.materials;
    const unique = row.products.filter((product, index, products) => products.findIndex(item => item.name === product.name) === index);
    expect(matchingProducts(a, b)).toEqual(unique);
    expect(matchingProducts(b, a)).toEqual(unique);
    expect(compatibleMaterials(a)).toContain(b);
  }
  for (const a of selectorMaterials) for (const b of selectorMaterials) {
    const source = rows.find(row => row.materials[0] === a && row.materials[1] === b || row.materials[0] === b && row.materials[1] === a);
    const products = source?.products ?? [];
    expect(matchingProducts(a, b)).toEqual(products.filter((product, index) => products.findIndex(item => item.name === product.name) === index));
  }
  for (const slug of Object.keys(selectorGuidance)) expect(tdsDocuments[slug]?.file).toBeTruthy();
  expect(selectorProductSlug('Bondtite Fast & Clear')).toBe('bondtite-fast-and-clear');
  expect(rows.flatMap(row => row.products)).toHaveLength(497);
  expect(rows.flatMap(row => row.products).some(product => /Vetra|VTRORES/i.test(product.name))).toBe(false);
  expect(matchingProducts('Metal', 'Concrete').map(product => product.name)).toEqual(['Bondtite Super Strength', 'Bondtite Fast & Clear', 'Bondtite Ultra Strength', 'Bondtite Uniweld']);
  const plastics = selectorMaterials.find(material => material.startsWith('Plastics'))!;
  expect(matchingProducts(plastics, 'Ceramics')).toEqual([
    { name: 'Bondtite Ultra Strength', priority: 1 },
    { name: 'Bondtite Fast & Clear', priority: 2 },
    { name: 'Bondtite Strong & Clear', priority: 3 },
  ]);
  expect(matchingProducts(plastics, 'Glass- back coated')).toHaveLength(3);
});

test('new White Paste recommendation includes its TDS conditions and product link', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('bondtite-selector-v2', JSON.stringify({ taskId: 'custom', first: 'Metal', second: 'Wood' })));
  await page.goto('/product-advisor');
  await page.getByRole('button', { name: 'Show my products' }).click();
  await expect(page.locator('.task-advisor__recommendations h3')).toHaveText(['Bondtite Super Strength', 'Bondtite Fast & Clear', 'Bondtite Ultra Strength', 'Bondtite White Paste']);
  const card = page.getByRole('article', { name: 'Priority 4: Bondtite White Paste' });
  await expect(card.getByText(/white finish is needed/)).toBeVisible();
  await expect(card.getByText(/Pot life is 60–80 minutes/)).toBeVisible();
  await expect(card.getByRole('link', { name: 'View product' })).toHaveAttribute('href', /bondtite-white-paste/);
  await expect(card.getByRole('link', { name: /Read technical data sheet/ })).toHaveAttribute('href', /bondtite_white_paste-tds.pdf#page=1/);
});

test('ordered products, TDS conditions, reverse pairing and reset', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    // Existing site-wide favicon 404 is unrelated to selector behavior.
    if (message.type() === 'error' && !message.location().url.endsWith('/favicon.ico')) errors.push(`${message.text()} ${message.location().url}`);
  });
  await page.goto('/product-advisor');
  await expect(page).toHaveTitle(/Product Advisor/);
  await expect(page.getByRole('heading', { name: 'Find the right bond.' })).toBeVisible();
  await page.getByRole('radio', { name: /Something else/ }).check();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const first = page.getByRole('group', { name: 'First material', exact: true });
  const second = page.getByRole('group', { name: 'Second material', exact: true });
  await first.getByRole('radio', { name: 'Wood', exact: true }).check();
  await second.getByRole('radio', { name: 'MDF', exact: true }).check();
  await page.getByRole('button', { name: 'Show my products' }).click();
  await expect(page.locator('.task-advisor__recommendations h3')).toHaveText(['Bondtite Hydra+', 'Bondtite Aqua', 'Bondtite Edge D3', 'Bondtite Wood']);
  await expect(page.locator('.task-advisor__priority')).toHaveText(['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4']);
  await expect(page.getByText(/Moisture-exposed furniture and wood-based/)).toBeVisible();
  await page.getByRole('button', { name: 'Edit answers' }).click();
  await first.getByRole('radio', { name: 'MDF', exact: true }).check();
  await expect(page.getByRole('button', { name: 'Show my products' })).toBeDisabled();
  await second.getByRole('radio', { name: 'Wood', exact: true }).check();
  await page.getByRole('button', { name: 'Show my products' }).click();
  await expect(page.locator('.task-advisor__recommendations h3')).toHaveText(['Bondtite Hydra+', 'Bondtite Aqua', 'Bondtite Edge D3', 'Bondtite Wood']);
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await expect(page.getByRole('heading', { name: 'Your recommended products' })).toBeInViewport();
  await page.screenshot({ path: `/tmp/bondtite-selector-${testInfo.project.name}.png`, animations: 'disabled', scale: 'css' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.getByRole('button', { name: 'Start again' }).click();
  await expect(page.getByRole('heading', { name: 'What are you working on?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeDisabled();
  expect(errors).toEqual([]);
});

test('missing pairs are hidden and a restored unsupported pair cannot submit', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('bondtite-selector-v2', JSON.stringify({ taskId: 'custom', first: 'Louvers', second: 'Louvers' })));
  await page.goto('/product-advisor');
  const second = page.getByRole('group', { name: 'Second material', exact: true });
  await expect(second).toBeVisible();
  await second.getByRole('button', { name: 'More materials' }).click();
  await expect(second.getByRole('radio', { name: 'Louvers', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Show my products' })).toBeDisabled();
  await second.getByRole('radio', { name: 'WPC', exact: true }).check();
  await page.getByRole('button', { name: 'Show my products' }).click();
  await expect(page.locator('.task-advisor__recommendations h3')).toHaveText(['Bondtite WPC Fix', 'Bondtite Fast & Clear', 'Bondtite Strong & Clear']);
  await expect(page.getByText('Vertical application is not recommended.', { exact: true })).toBeVisible();
});
