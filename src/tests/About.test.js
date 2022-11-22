import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('O componente About.js', () => {
  test('contém um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const headerEl = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(headerEl).toBeInTheDocument();
  });

  test('contém 2 parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const pList = container.querySelectorAll('p');
    expect(pList.length).toBe(2);
  });

  test('contém uma imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgEl = screen.getByRole('img');

    expect(imgEl).toBeInTheDocument();
    expect(imgEl.src).toBe(imgSrc);
  });
});
