import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('O componente FavoritePokemon.js', () => {
  test('exibe na tela a mensagem "No favorite pokémon found" caso não tenha pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const notfoundEl = screen.getByText('No favorite Pokémon found', { exact: true });
    expect(notfoundEl).toBeInTheDocument();
  });
});
