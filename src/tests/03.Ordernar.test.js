import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import testData from '../../cypress/mocks/testData';
import App from '../App';
import StarProvider from '../context/StarProvider';
import userEvent from '@testing-library/user-event';

describe('1 - Ordene as colunas de forma ascendente ou descendente', () => {
  it('Verifique se os inputs estão na tela', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
  })
  render(<StarProvider><App /></StarProvider>);
  const columnSort = screen.getByTestId('column-sort')
  const columnSortInputAsc = screen.getByTestId('column-sort-input-asc')
  const columnSortInputDesc = screen.getByTestId('column-sort-input-desc')
  const columnSortButton = screen.getByTestId('column-sort-button')

  expect(columnSort).toBeInTheDocument();
  expect(columnSortInputAsc).toBeInTheDocument();
  expect(columnSortInputDesc).toBeInTheDocument();
  expect(columnSortButton).toBeInTheDocument();
  })
  
  it('Ordene os planetas do maior período orbital para o menor período orbital', async () => {
  global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
  })
  render(<StarProvider><App /></StarProvider>);
  const columnSort = screen.getByTestId('column-sort')
  const columnSortInputDesc = screen.getByTestId('column-sort-input-desc')
  const columnSortButton = screen.getByTestId('column-sort-button')
  fireEvent.change(columnSort, 'orbital_period')
  userEvent.click(columnSortInputDesc)
  userEvent.click(columnSortButton)

  const planetName = await screen.findAllByTestId('planet-name')
  waitFor(() => expect(planetName[0]).toHaveTextContent('Bespin'));
  waitFor(() => expect(planetName[1]).toHaveTextContent('Yavin IV'));
  waitFor(() => expect(planetName[2]).toHaveTextContent('Hoth'));
  waitFor(() => expect(planetName[3]).toHaveTextContent('Kamino'));
  waitFor(() => expect(planetName[4]).toHaveTextContent('Endor'));
  waitFor(() => expect(planetName[5]).toHaveTextContent('Coruscant'));
  waitFor(() => expect(planetName[6]).toHaveTextContent('Alderaan'));
  waitFor(() => expect(planetName[7]).toHaveTextContent('Dagobah'));
  waitFor(() => expect(planetName[8]).toHaveTextContent('Naboo'));
  waitFor(() => expect(planetName[9]).toHaveTextContent('Tatooine'));
  });

  it('Ordene os planetas do menor diâmetro para o maior diâmetro', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
  const columnSort = screen.getByTestId('column-sort')
  const columnSortInputAsc = screen.getByTestId('column-sort-input-asc')
  const columnSortButton = screen.getByTestId('column-sort-button')
  fireEvent.change(columnSort, 'diameter')
  userEvent.click(columnSortInputAsc)
  userEvent.click(columnSortButton)

  const planetName = await screen.findAllByTestId('planet-name')
  waitFor(() => expect(planetName[0]).toHaveTextContent('Endor'));
  waitFor(() => expect(planetName[1]).toHaveTextContent('Hoth'));
  waitFor(() => expect(planetName[2]).toHaveTextContent('Dagobah'));
  waitFor(() => expect(planetName[3]).toHaveTextContent('Yavin IV'));
  waitFor(() => expect(planetName[4]).toHaveTextContent('Tatooine'));
  waitFor(() => expect(planetName[5]).toHaveTextContent('Naboo'));
  waitFor(() => expect(planetName[6]).toHaveTextContent('Coruscant'));
  waitFor(() => expect(planetName[7]).toHaveTextContent('Alderaan'));
  waitFor(() => expect(planetName[8]).toHaveTextContent('Kamino'));
  waitFor(() => expect(planetName[9]).toHaveTextContent('Bespin'));
  });

  it('Ordene os planetas do mais populoso para o menos populoso', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
  const columnSort = screen.getByTestId('column-sort')
  const columnSortInputDesc = screen.getByTestId('column-sort-input-desc')
  const columnSortButton = screen.getByTestId('column-sort-button')
  fireEvent.change(columnSort, 'population')
  userEvent.click(columnSortInputDesc)
  userEvent.click(columnSortButton)

  const planetName = await screen.findAllByTestId('planet-name')
  waitFor(() => expect(planetName[0]).toHaveTextContent('Coruscant'));
  waitFor(() => expect(planetName[1]).toHaveTextContent('Naboo'));
  waitFor(() => expect(planetName[2]).toHaveTextContent('Alderaan'));
  waitFor(() => expect(planetName[3]).toHaveTextContent('Kamino'));
  waitFor(() => expect(planetName[4]).toHaveTextContent('Endor'));
  waitFor(() => expect(planetName[5]).toHaveTextContent('Bespin'));
  waitFor(() => expect(planetName[6]).toHaveTextContent('Tatooine'));
  waitFor(() => expect(planetName[7]).toHaveTextContent('Yavin IV'));

  const hoth = await screen.findByText('Hoth');
  waitFor(() => expect(hoth).not.toBeInTheDocument());

  const dagobah = await screen.findByText('Dagobah');
  waitFor(() => expect(dagobah).not.toBeInTheDocument());
});

  it('Ordene os planetas do menos populoso para o mais populoso', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
  const columnSort = screen.getByTestId('column-sort')
  const columnSortInputAsc = screen.getByTestId('column-sort-input-asc')
  const columnSortButton = screen.getByTestId('column-sort-button')
  fireEvent.change(columnSort, 'population')
  userEvent.click(columnSortInputAsc)
  userEvent.click(columnSortButton)

  const planetName = await screen.findAllByTestId('planet-name')
  waitFor(() => (planetName[0]).toHaveTextContent('Yavin IV'));
  waitFor(() => (planetName[1]).toHaveTextContent('Tatooine'));
  waitFor(() => (planetName[2]).toHaveTextContent('Bespin'));
  waitFor(() => (planetName[3]).toHaveTextContent('Endor'));
  waitFor(() => (planetName[4]).toHaveTextContent('Kamino'));
  waitFor(() => (planetName[5]).toHaveTextContent('Alderaan'));
  waitFor(() => (planetName[6]).toHaveTextContent('Naboo'));
  waitFor(() => (planetName[7]).toHaveTextContent('Coruscant'));

  const hoth = await screen.findByText('Hoth');
  waitFor(() => expect(hoth).not.toBeInTheDocument());

  const dagobah = await screen.findByText('Dagobah');
  waitFor(() => expect(dagobah).not.toBeInTheDocument());
  });
});
