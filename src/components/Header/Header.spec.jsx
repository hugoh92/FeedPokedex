// Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './index.jsx';

test('renders header with logo', () => {
  render(<Header />);
  
  // Usa o getByAltText para encontrar a imagem pelo  (alt)
  const logoElement = screen.getByAltText('Logo');

  // Verifica se está presente na page
  expect(logoElement).toBeInTheDocument();

  // Verifique style da img
  expect(logoElement).toHaveStyle({ maxWidth: '200px', maxHeight: '60px', width: 'auto', height: 'auto' });
});
