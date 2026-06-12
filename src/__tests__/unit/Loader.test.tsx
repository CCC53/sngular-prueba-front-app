import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { Loader } from '@/app/components/Loader';

describe('Loader', () => {
  it('muestra el mensaje de carga', () => {
    render(<Loader />);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
