import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('O componente NotFound.js', () => {
  test('Contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notfoundEl = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });
    expect(notfoundEl).toBeInTheDocument();
  });

  test('Contém uma imagem', () => {
    renderWithRouter(<NotFound />);
    const imgEl = screen.getByRole('img');
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgValid = imgEl.src === imgSrc;

    expect(imgEl).toBeInTheDocument();
    expect(imgValid).toBeTruthy();
  });
});
