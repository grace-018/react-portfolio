import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero heading', () => {
  render(<App />);
  const heading = screen.getByText(/Mary Grace Sio/i);
  expect(heading).toBeInTheDocument();
});
