import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { Footer } from '@/app/components/Footer';

describe('Footer', () => {
  it('muestra el autor y el año actual', () => {
    render(<Footer />);

    expect(screen.getByText('Carlos Calette')).toBeInTheDocument();
    expect(screen.getByText(`© ${new Date().getFullYear()}`)).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });
});
