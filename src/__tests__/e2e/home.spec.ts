import { test, expect } from '@playwright/test';
import { mockCharacterApi } from './helpers/mock-api';
import { waitForHomePageReady } from './helpers/wait-for-app';
import { mockRick } from './fixtures/characters';

test.describe('Página principal', () => {
  test.beforeEach(async ({ page }) => {
    await mockCharacterApi(page);
    await page.goto('/');
    await waitForHomePageReady(page);
  });

  test('muestra el título y la lista de personajes', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Wubba lubba dub dub' })).toBeVisible();
    await expect(page.getByText('Base de datos de personajes de Rick y Morty')).toBeVisible();
    await expect(page.getByText('Rick Sanchez')).toBeVisible();
    await expect(page.getByText('Morty Smith')).toBeVisible();
  });

  test('abre y cierra el modal de detalles del personaje', async ({ page }) => {
    await page.locator('main img[alt="Nombre"]').first().click();
    const modal = page.getByRole('presentation');
    await expect(modal.getByText(mockRick.name)).toBeVisible();
    await expect(modal.getByText(`Estado: ${mockRick.status}`)).toBeVisible();
    await modal.getByRole('button').click();
    await expect(modal).not.toBeVisible();
  });

  test('navega entre páginas de resultados', async ({ page }) => {
    await expect(page.getByText('Rick Sanchez')).toBeVisible();
    await page.getByRole('button', { name: 'Go to page 2' }).click();
    await expect(page.getByText('Summer Smith')).toBeVisible();
    await expect(page.getByText('Rick Sanchez')).not.toBeVisible();
  });
});
