import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('O componente App.js ', () => {
  test('contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: 'Home' });
    const aboutEl = screen.getByRole('link', { name: 'About' });
    const favoriteEl = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(homeEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
    expect(favoriteEl).toBeInTheDocument();
  });

  test('redireciona para página inicial na URL / ao clicar no link Home na navbar', () => {
    // pega o histórico ao renderizar App
    const { history } = renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeEl); // clica no elemento

    const { pathname } = history.location; // pega o path do histórico
    expect(pathname).toBe('/');
  });

  test('redireciona para About na URL /about ao clicar no link About na navbar', () => {
    const { history } = renderWithRouter(<App />);
    const aboutEl = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('redireciona para Pokémon Favoritados na URL /favorites ao clicar no link Favorite Pokemon na navbar', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteEl = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoriteEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/jldfghsi');
    }); // manda a página para tal

    const notfoundEl = screen.getByRole('heading', { name: 'Page requested not found' });
    // Page requested not found
    expect(notfoundEl).toBeInTheDocument();
  });
});

// test('', () => {});
