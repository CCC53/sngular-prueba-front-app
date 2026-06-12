import { Page } from '@playwright/test';
import { emptySearchResponse, pageOneResponse, pageTwoResponse, searchRickResponse } from '../fixtures/characters';

function isCharacterApiRequest(url: string) {
  const { pathname } = new URL(url);
  return pathname.endsWith('/character');
}

export async function mockCharacterApi(page: Page) {
  await page.route((url) => isCharacterApiRequest(url.toString()), async (route) => {
    const url = new URL(route.request().url());
    const pageParam = url.searchParams.get('page') ?? '1';
    const nameParam = url.searchParams.get('name');

    if (nameParam) {
      const body = nameParam.toLowerCase().includes('rick')
        ? searchRickResponse
        : emptySearchResponse;
      await route.fulfill({ status: 200, contentType: 'application/json', json: body });
      return;
    }

    const body = pageParam === '2' ? pageTwoResponse : pageOneResponse;
    await route.fulfill({ status: 200, contentType: 'application/json', json: body });
  });
}
