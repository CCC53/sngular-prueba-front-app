import { screen, fireEvent } from '@testing-library/react';
import { Header } from '@/app/components/Header';
import { renderWithProviders } from './helpers/render-with-providers';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: jest.fn(() => '/'),
}));

import { usePathname } from 'next/navigation';

const mockedUsePathname = usePathname as jest.Mock;

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockedUsePathname.mockReturnValue('/');
  });

  it('no muestra el título en la página principal', () => {
    renderWithProviders(<Header />);

    expect(screen.queryByText('Rick & Morty Character Explorer')).not.toBeInTheDocument();
  });

  it('muestra el título en otras páginas', () => {
    mockedUsePathname.mockReturnValue('/favoritos');
    renderWithProviders(<Header />);

    expect(screen.getByText('Rick & Morty Character Explorer')).toBeInTheDocument();
  });

  it('muestra búsqueda y botón de favoritos en la página principal', () => {
    renderWithProviders(<Header />);

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mis favoritos/i })).toBeInTheDocument();
  });

  it('navega a favoritos al pulsar el botón', () => {
    renderWithProviders(<Header />);

    fireEvent.click(screen.getByRole('button', { name: /mis favoritos/i }));

    expect(mockPush).toHaveBeenCalledWith('/favoritos');
  });

  it('actualiza el término de búsqueda al escribir', () => {
    renderWithProviders(<Header />);

    fireEvent.change(screen.getByPlaceholderText('Buscar...'), { target: { value: 'Rick' } });

    expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
  });

  it('oculta búsqueda y favoritos en la página de favoritos', () => {
    mockedUsePathname.mockReturnValue('/favoritos');
    renderWithProviders(<Header />);

    expect(screen.queryByPlaceholderText('Buscar...')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /mis favoritos/i })).not.toBeInTheDocument();
  });
});
