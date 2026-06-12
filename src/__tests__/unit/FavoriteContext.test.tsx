import { renderHook, act, waitFor } from '@testing-library/react';
import { FavoriteProvider, useFavoriteContext } from '@/app/context/FavoriteContext';
import { mockRick, mockMorty } from './fixtures/characters';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoriteProvider>{children}</FavoriteProvider>
);

describe('FavoriteContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicia con favoritos vacíos y búsqueda nula', async () => {
    const { result } = renderHook(() => useFavoriteContext(), { wrapper });

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
      expect(result.current.search).toBeNull();
    });
  });

  it('añade un personaje a favoritos', () => {
    const { result } = renderHook(() => useFavoriteContext(), { wrapper });

    act(() => result.current.addOne(mockRick));

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(mockRick);
    expect(result.current.exists(mockRick)).toBe(true);
  });

  it('no duplica personajes al añadir el mismo dos veces', () => {
    const { result } = renderHook(() => useFavoriteContext(), { wrapper });

    act(() => {
      result.current.addOne(mockRick);
      result.current.addOne(mockRick);
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it('elimina un personaje de favoritos', () => {
    const { result } = renderHook(() => useFavoriteContext(), { wrapper });

    act(() => {
      result.current.addOne(mockRick);
      result.current.addOne(mockMorty);
      result.current.removeOne(mockRick);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(mockMorty);
    expect(result.current.exists(mockRick)).toBe(false);
  });

  it('actualiza el término de búsqueda', () => {
    const { result } = renderHook(() => useFavoriteContext(), { wrapper });

    act(() => result.current.setSearch('Rick'));

    expect(result.current.search).toBe('Rick');
  });

  it('persiste favoritos en localStorage', async () => {
    const { result } = renderHook(() => useFavoriteContext(), { wrapper });

    act(() => result.current.addOne(mockRick));

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('rick-morty-favorites')!)).toEqual([mockRick]);
    });
  });

  it('carga favoritos desde localStorage al iniciar', async () => {
    localStorage.setItem('rick-morty-favorites', JSON.stringify([mockRick]));

    const { result } = renderHook(() => useFavoriteContext(), { wrapper });

    await waitFor(() => {
      expect(result.current.favorites).toEqual([mockRick]);
    });
  });

  it('persiste el término de búsqueda en localStorage', () => {
    const { result } = renderHook(() => useFavoriteContext(), { wrapper });

    act(() => result.current.setSearch('Rick'));

    expect(localStorage.getItem('rick-morty-search')).toBe('Rick');
  });

  it('lanza error si se usa fuera del provider', () => {
    expect(() => renderHook(() => useFavoriteContext())).toThrow('Context fuera de provider');
  });
});
