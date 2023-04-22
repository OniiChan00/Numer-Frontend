import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders home page', () => {
  const { getByText, getByAltText } = render(<Home />);
  const pageTitle = getByText(/Numerical Project/i);
  const logo = getByAltText(/logo/i);
  expect (pageTitle).toBeInTheDocument();
  expect (logo).toBeInTheDocument();
  expect (pageTitle).toHaveTextContent("Numerical Project");
});


