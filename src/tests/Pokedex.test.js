import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('O componente Pokedex.js', () => {
  test('Contém um heading h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    const headerEl = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(headerEl).toBeInTheDocument();
  });

  test('Renderiza o próximo pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    // para verificar se vai mudar o pkm
    const pikachuEl = screen.getByText(/pikachu/i);
    expect(pikachuEl).toBeInTheDocument();

    const btnNext = screen.getByTestId('next-pokemon');
    expect(btnNext).toBeInTheDocument();
    userEvent.click(btnNext);
    const charmanderEl = screen.getByText(/charmander/i);
    expect(charmanderEl).toBeInTheDocument();
  });

  test('Contém os botões de filtro', () => {
    renderWithRouter(<App />);
    const filters = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    filterBtns.forEach((btn, index) => {
      expect(btn).toHaveTextContent(filters[index]); // 🤙 ➡️ 🐴
    });
  });

  test('Contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    expect(allBtn).not.toHaveAttribute('data-testid', 'pokemon-type-button');
    userEvent.click(allBtn);
  });
});
