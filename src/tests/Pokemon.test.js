import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pkm = {
  name: 'Pikachu',
  id: 25,
  src: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

describe('O componente Pokemon.js', () => {
  test('Contém um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pkmNameEl = screen.getByTestId('pokemon-name');
    const pkmTypeEl = screen.getByTestId('pokemon-type');
    const pkmImgEl = screen.getByRole('img');
    expect(pkmNameEl).toBeInTheDocument();
    expect(pkmTypeEl).toBeInTheDocument();
    expect(pkmTypeEl).toHaveTextContent('Electric');

    expect(pkmImgEl).toBeInTheDocument();
  });

  test('Contém uma imagem com o src correto', () => {
    renderWithRouter(<App />);
    const pkmImgEl = screen.getByRole('img');
    expect(pkmImgEl).toBeInTheDocument();
    expect(pkmImgEl).toHaveAttribute('src', pkm.src);
    expect(pkmImgEl).toHaveAttribute('alt', `${pkm.name} sprite`);
  });

  test('Renderiza a imagem de favorito', () => {
    const { history } = renderWithRouter(<App />);
    // vai nos detalhes, salva como favorito, volta e ve se a estrela tá lá
    const detailBtn = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailBtn);

    const favBtn = screen.getByRole('checkbox');
    userEvent.click(favBtn);
    act(() => history.push('/'));

    const favImgEl = screen.getByAltText(`${pkm.name} is marked as favorite`);
    expect(favImgEl).toBeInTheDocument();
    expect(favImgEl).toHaveAttribute('alt', `${pkm.name} is marked as favorite`);
    expect(favImgEl).toHaveAttribute('src', '/star-icon.svg');
  });
});
