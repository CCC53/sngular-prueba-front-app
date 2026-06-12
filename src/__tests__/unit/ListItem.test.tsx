import { screen, fireEvent } from '@testing-library/react';
import { ListItem } from '@/app/components/ListItem';
import { renderWithProviders } from './helpers/render-with-providers';
import { mockRick } from './fixtures/characters';

describe('ListItem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra el nombre del personaje', () => {
    renderWithProviders(<ListItem char={mockRick} handleClick={jest.fn()} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('ejecuta handleClick al pulsar la imagen', () => {
    const handleClick = jest.fn();
    renderWithProviders(<ListItem char={mockRick} handleClick={handleClick} />);

    fireEvent.click(screen.getByRole('img'));

    expect(handleClick).toHaveBeenCalledWith(mockRick);
  });

  it('añade el personaje a favoritos al pulsar la estrella vacía', () => {
    renderWithProviders(<ListItem char={mockRick} handleClick={jest.fn()} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('StarIcon')).toBeInTheDocument();
  });

  it('elimina el personaje de favoritos si ya está marcado', () => {
    renderWithProviders(<ListItem char={mockRick} handleClick={jest.fn()} />);

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);
    fireEvent.click(favoriteButton);

    expect(screen.getByTestId('StarBorderIcon')).toBeInTheDocument();
  });
});
