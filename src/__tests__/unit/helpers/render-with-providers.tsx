import { render, RenderOptions } from '@testing-library/react';
import { FavoriteProvider } from '@/app/context/FavoriteContext';

export function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  return render(<FavoriteProvider>{ui}</FavoriteProvider>, options);
}
