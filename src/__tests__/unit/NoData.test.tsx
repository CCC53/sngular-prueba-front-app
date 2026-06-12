import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { NoData } from '@/app/components/NoData';

describe('NoData', () => {
  it('muestra el mensaje de sin registros', () => {
    render(<NoData />);

    expect(screen.getByText('No hay registros')).toBeInTheDocument();
  });
});
