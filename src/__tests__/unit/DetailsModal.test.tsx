import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import { DetailsModal } from '@/app/components/DetailsModal';
import { mockRick, mockMorty } from './fixtures/characters';

describe('DetailsModal', () => {
  it('muestra los datos del personaje cuando está abierto', () => {
    render(<DetailsModal char={mockRick} open onClose={jest.fn()} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/Estado:\s*Alive/)).toBeInTheDocument();
    expect(screen.getByText(/Género:\s*Male/)).toBeInTheDocument();
    expect(screen.getByText(/Especie:\s*Human/)).toBeInTheDocument();
    expect(screen.getByText(/Origen:\s*Earth \(C-137\)/)).toBeInTheDocument();
    expect(screen.getByText(/Ubicación:\s*Citadel of Ricks/)).toBeInTheDocument();
  });

  it('ejecuta onClose al pulsar el botón de cerrar', () => {
    const onClose = jest.fn();
    render(<DetailsModal char={mockRick} open onClose={onClose} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('no renderiza nada si no hay personaje', () => {
    const { container } = render(
      <DetailsModal char={null as unknown as typeof mockRick} open onClose={jest.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('muestra chips con distintos estados y géneros', () => {
    render(<DetailsModal char={mockMorty} open onClose={jest.fn()} />);

    expect(screen.getByText(/Estado:\s*Dead/)).toBeInTheDocument();
    expect(screen.getByText(/Género:\s*Female/)).toBeInTheDocument();
  });
});
