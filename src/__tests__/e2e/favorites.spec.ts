import { test, expect } from '@playwright/test';
import { mockCharacterApi } from './helpers/mock-api';
import { waitForHomePageReady } from './helpers/wait-for-app';

test.describe('Favoritos', () => {
  test.beforeEach(async ({ page }) => {
    await mockCharacterApi(page);
    await page.goto('/');
    await waitForHomePageReady(page);
  });

  test('muestra estado vacío cuando no hay favoritos', async ({ page }) => {
    await page.getByRole('button', { name: 'Mis Favoritos' }).click();
    await expect(page).toHaveURL('/favoritos');
    await expect(page.getByRole('heading', { name: 'Mis favoritos' })).toBeVisible();
    await expect(page.getByText('No hay registros')).toBeVisible();
  });

  test('añade un personaje a favoritos y lo muestra en la página', async ({ page }) => {
    const rickCard = page.locator('div').filter({ hasText: 'Rick Sanchez' }).last();
    await rickCard.getByRole('button').click();
    await page.getByRole('button', { name: 'Mis Favoritos' }).click();
    await expect(page.getByText('Rick Sanchez')).toBeVisible();
    await expect(page.getByText('Morty Smith')).not.toBeVisible();
  });

  test('elimina un personaje de favoritos', async ({ page }) => {
    const rickCard = page.locator('div').filter({ hasText: 'Rick Sanchez' }).last();
    await rickCard.getByRole('button').click();
    await page.getByRole('button', { name: 'Mis Favoritos' }).click();
    await expect(page.getByText('Rick Sanchez')).toBeVisible();

    const favoriteCard = page.locator('div').filter({ hasText: 'Rick Sanchez' }).last();
    await favoriteCard.getByRole('button').click();
    await expect(page.getByText('No hay registros')).toBeVisible();
  });

  test('vuelve a la página principal desde favoritos', async ({ page }) => {
    await page.getByRole('button', { name: 'Mis Favoritos' }).click();
    await page.getByRole('button', { name: 'Volver' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Wubba lubba dub dub' })).toBeVisible();
  });
});
