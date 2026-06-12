import { test, expect } from '@playwright/test';
import { mockCharacterApi } from './helpers/mock-api';
import { waitForHomePageReady } from './helpers/wait-for-app';

test.describe('Búsqueda de personajes', () => {
  test.beforeEach(async ({ page }) => {
    await mockCharacterApi(page);
    await page.goto('/');
    await waitForHomePageReady(page);
  });

  test('filtra personajes por nombre', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'buscar' });
    await searchInput.fill('Rick');
    await expect(page.getByText('Rick Sanchez')).toBeVisible();
    await expect(page.getByText('Morty Smith')).not.toBeVisible();
  });

  test('muestra mensaje cuando no hay resultados', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'buscar' });
    await searchInput.fill('xyz-no-existe');
    await expect(page.getByText('No hay registros')).toBeVisible();
  });
});
