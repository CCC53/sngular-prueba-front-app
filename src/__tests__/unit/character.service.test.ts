import { characterService } from '@/app/api/character.service';
import { apiClient } from '@/app/api/apiClient';
import { pageOneResponse } from '@/__tests__/e2e/fixtures/characters';

jest.mock('@/app/api/apiClient', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

const mockedGet = apiClient.get as jest.Mock;

describe('characterService', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('obtiene personajes por página sin filtro de nombre', async () => {
    mockedGet.mockResolvedValue({ data: pageOneResponse });

    const response = await characterService.getAll(1, null);

    expect(mockedGet).toHaveBeenCalledWith('/character?page=1');
    expect(response.data).toEqual(pageOneResponse);
  });

  it('obtiene personajes filtrados por nombre', async () => {
    mockedGet.mockResolvedValue({ data: pageOneResponse });

    await characterService.getAll(2, 'Rick');

    expect(mockedGet).toHaveBeenCalledWith('/character?page=2&name=Rick');
  });
});
