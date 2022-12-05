import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import testData from '../../cypress/mocks/testData';
import App from '../App';
import StarProvider from '../context/StarProvider';
import userEvent from '@testing-library/user-event';

describe('1 - Apague um filtro de valor numérico ao clicar no ícone de X de um dos filtros e apague todas filtragens numéricas simultaneamente ao clicar em outro botão de Remover todas filtragens', () => {
  it('Adicione um filtro e verifique se a tabela foi atualizada com as informações filtradas, depois remova o filtro e verifique se os valores da tabela voltaram ao original', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    expect(coluna).toBeInTheDocument();
    const comparison = screen.getByTestId('comparison-filter')
    expect(comparison).toBeInTheDocument();
    const value = screen.getByTestId('value-filter')
    expect(value).toBeInTheDocument();
    const button = screen.getByTestId('button-filter')
    expect(button).toBeInTheDocument();

    fireEvent.change(coluna, {target: { value: 'diameter'}})
    fireEvent.change(comparison, {target: { value: 'maior que'}})
    userEvent.type(value, '8900')
    userEvent.click(button)

    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(7));

    const buttonDelete = screen.getByRole('button', {name: /delete/i})
    userEvent.click(buttonDelete) 
    waitFor(() => expect(planetName).toHaveLength(10));
  });

  it('Adicione dois filtros e verifique se a tabela foi atualizada com as informações filtradas, depois remova os filtros e verifique se os valores da tabela voltaram ao original', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const button = screen.getByTestId('button-filter')

    fireEvent.change(coluna, {target: { value: 'diameter'}})
    fireEvent.change(comparison, {target: { value: 'maior que'}})
    userEvent.type(value, '8900')
    userEvent.click(button)

    fireEvent.change(coluna, {target: { value: 'population'}})
    fireEvent.change(comparison, {target: { value: 'menor que'}})
    userEvent.type(value, '1000000')
    userEvent.click(button)

    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(2));

    const buttonDeletePopulation = screen.getByTestId('diameter')
    userEvent.click(buttonDeletePopulation)

    waitFor(() => expect(planetName).toHaveLength(2));

    const buttonDeleteDiameter = screen.getByTestId('population')
    userEvent.click(buttonDeleteDiameter)

    waitFor(() => expect(planetName).toHaveLength(10));
  });

  it('Adicione dois filtros e verifique se a tabela foi atualizada com as informações filtradas, depois remova os filtros e verifique se os valores da tabela voltaram ao original', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const button = screen.getByTestId('button-filter')

    fireEvent.change(coluna, {target: { value: 'population'}})
    fireEvent.change(comparison, {target: { value: 'menor que'}})
    userEvent.type(value, '1000000')
    userEvent.click(button)

    fireEvent.change(coluna, {target: { value: 'rotation_period'}})
    fireEvent.change(comparison, {target: { value: 'igual a'}})
    userEvent.type(value, '23')
    userEvent.click(button)

    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(1));

    const buttonDeleteDiameter = screen.getByTestId('population')
    userEvent.click(buttonDeleteDiameter)

    waitFor(() => expect(planetName).toHaveLength(3));
  });

  it('Adicione dois filtros e verifique se a tabela foi atualizada com as informações filtradas, depois remova os filtros e verifique se os valores da tabela voltaram ao original', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const button = screen.getByTestId('button-filter')

    fireEvent.change(coluna, {target: { value: 'population'}})
    fireEvent.change(comparison, {target: { value: 'maior que'}})
    userEvent.type(value, '1000000')
    userEvent.click(button)

    fireEvent.change(coluna, {target: { value: 'rotation_period'}})
    fireEvent.change(comparison, {target: { value: 'igual a'}})
    userEvent.type(value, '23')
    userEvent.click(button)

    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(1));

    const buttonDeleteDiameter = screen.getByTestId('rotation_period')
    userEvent.click(buttonDeleteDiameter)

    waitFor(() => expect(planetName).toHaveLength(7));
  });

  it('Adicione três filtros e clique no botão Remover Filtragens, todos os filtros deverão ser removidos', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const button = screen.getByTestId('button-filter')

    fireEvent.change(coluna, {target: { value: 'diameter'}})
    fireEvent.change(comparison, {target: { value: 'maior que'}})
    userEvent.type(value, '8900')
    userEvent.click(button)

    fireEvent.change(coluna, {target: { value: 'population'}})
    fireEvent.change(comparison, {target: { value: 'menor que'}})
    userEvent.type(value, '1000000')
    userEvent.click(button)

    fireEvent.change(coluna, {target: { value: 'rotation_period'}})
    fireEvent.change(comparison, {target: { value: 'igual a'}})
    userEvent.type(value, '23')
    userEvent.click(button)

    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(2));

    const buttonRemoveFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(buttonRemoveFilters)

    waitFor(() => expect(planetName).toHaveLength(10));
  });
});
