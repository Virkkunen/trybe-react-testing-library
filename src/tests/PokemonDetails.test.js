import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pkm = {
  name: 'Pikachu',
  id: 25,
  route: '/pokemon/25',
  src: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

describe('O componente PokemonDetails.js', () => {
  test('Contém um h2 com o texto "<name> details"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pkm.route));
    const headerEl = screen.getByRole('heading', {
      name: `${pkm.name} Details`,
      level: 2,
    });
    expect(headerEl).toBeInTheDocument();
  });

  test('Contém um h2 com o texto "Summary"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pkm.route));
    const headerEl = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(headerEl).toBeInTheDocument();
  });

  test('Contém um h2 com o texto "Game locations of <name>"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pkm.route));
    const headerEl = screen.getByRole('heading', {
      name: `Game Locations of ${pkm.name}`,
      level: 2,
    });
    expect(headerEl).toBeInTheDocument();
  });

  test('Contém imagens de localização com o src correto', () => {
    const srcs = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pkm.route));
    const imgEl = screen.getAllByAltText(`${pkm.name} location`);
    imgEl.forEach((img, index) => {
      expect(img.src).toEqual(srcs[index]);
    });
  });

  test('Contém uma label com o texto "Pokémon favoritado?"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pkm.route));
    const labelEl = screen.getByLabelText('Pokémon favoritado?');
    expect(labelEl).toBeInTheDocument();
  });

  test('Contém o sumário do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pkm.route));
    const summaryEl = screen.getByText(pkm.summary);
    expect(summaryEl).toBeInTheDocument();
  });
});
