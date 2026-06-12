import { expect, Page } from '@playwright/test';

export async function waitForHomePageReady(page: Page) {
  await expect(page.getByRole('heading', { name: 'Wubba lubba dub dub' })).toBeVisible();
  await expect(page.locator('.MuiCircularProgress-root')).toHaveCount(0, { timeout: 15_000 });
  await expect(page.getByText('Rick Sanchez').or(page.getByText('No hay registros')).or(page.locator('.MuiAlert-root')).first()).toBeVisible();
}
