import { render, screen } from '@testing-library/react';
import App from '../App';

test('This is an example test', () => {
  render(<App />);
  const appWrapper = screen.getAllByTestId("app-wrapper")[0];
  expect(appWrapper).toBeInTheDocument();
});
