import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import testData from '../../cypress/mocks/testData';
import App from '../App';
import StarProvider from '../context/StarProvider';
import userEvent from '@testing-library/user-event';

describe('1 - Faça uma requisição para o endpoint `/planets` da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos da coluna `residents`', () => {
  it('Verifique se todos os inputs e o button são exibidos', () => {
    render(<StarProvider><App /></StarProvider>);
    const name = screen.getByTestId('name-filter')
    expect(name).toBeInTheDocument();
    const coluna = screen.getByTestId('column-filter')
    expect(coluna).toBeInTheDocument();
    const comparison = screen.getByTestId('comparison-filter')
    expect(comparison).toBeInTheDocument();
    const value = screen.getByTestId('value-filter')
    expect(value).toBeInTheDocument();
    const button = screen.getByTestId('button-filter')
    expect(button).toBeInTheDocument();
  });

  it('Verifique se a tabela tem 13 colunas', () => {
    render(<StarProvider><App /></StarProvider>);
    const name = screen.getByText(/Name/i);
    expect(name).toBeInTheDocument();
    const rotation = screen.getByText(/Rotation Period/i);
    expect(rotation).toBeInTheDocument();
    const orbital = screen.getByText(/Orbital Period/i);
    expect(orbital).toBeInTheDocument();
    const diameter = screen.getByText('Diameter');
    expect(diameter).toBeInTheDocument();
    const climate = screen.getByText(/Climate/i);
    expect(climate).toBeInTheDocument();
    const gravity = screen.getByText(/Gravity/i);
    expect(gravity).toBeInTheDocument();
    const terrain = screen.getByText(/Terrain/i);
    expect(terrain).toBeInTheDocument();
    const surface = screen.getByText(/Surface Water/i);
    expect(surface).toBeInTheDocument();
    const population = screen.getByText('Population');
    expect(population).toBeInTheDocument();
    const films = screen.getByText(/Films/i);
    expect(films).toBeInTheDocument();
    const created = screen.getByText(/Created/i);
    expect(created).toBeInTheDocument();
    const edited = screen.getByText(/Edited/i);
    expect(edited).toBeInTheDocument();
    const url = screen.getByText(/URL/i);
    expect(url).toBeInTheDocument();
  });

  it('Verifique se a tabela tem uma linha para cada planeta retornado', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
    render(<StarProvider><App /></StarProvider>);
    const planetName = await screen.findAllByTestId('planet-name');
    expect(planetName).toHaveLength(10);
  });

  it('Verifique se é renderizado todos os planetas na tabela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
  const tatooine = await screen.findByText('Tatooine');
  expect(tatooine).toBeInTheDocument();
  const alderaan = await screen.findByText('Alderaan');
  expect(alderaan).toBeInTheDocument();
  const yavin = await screen.findByText(/Yavin IV/i);
  expect(yavin).toBeInTheDocument();
  const hoth = await screen.findByText('Hoth');
  expect(hoth).toBeInTheDocument();
  const dagobah = await screen.findByText('Dagobah');
  expect(dagobah).toBeInTheDocument();
  const bespin = await screen.findByText('Bespin');
  expect(bespin).toBeInTheDocument();
  const endor = await screen.findByText('Endor');
  expect(endor).toBeInTheDocument();
  const naboo = await screen.findByText('Naboo');
  expect(naboo).toBeInTheDocument();
  const coruscant = await screen.findByText('Coruscant');
  expect(coruscant).toBeInTheDocument();
  const kamino = await screen.findByText('Kamino');
  expect(kamino).toBeInTheDocument();
  });
});

describe('2 - Crie um filtro de texto para a tabela', () => {
  it('Filtre os planetas que possuem a letra "o" no nome', async () => {
  global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
  const nameFilter = screen.getByTestId('name-filter');
  expect(nameFilter).toBeInTheDocument();
  userEvent.type(nameFilter, 'o');

  const planetName = await screen.findAllByTestId('planet-name');
  expect(planetName).toHaveLength(7);

  });

  it('Filtre planetas que possuem a letra "oo" no nome', async () => {
  global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
  const nameFilter = await screen.findByTestId('name-filter');
  userEvent.type(nameFilter, 'oo'); 

  const planetName = await screen.findAllByTestId('planet-name');
  expect(planetName).toHaveLength(2);
  });

  it('Faça vários filtros em sequência', async () => {
  global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);

  const nameFilter = await screen.findByTestId('name-filter');
  userEvent.type(nameFilter, 'o');  
  userEvent.type(nameFilter, 'oo');
  userEvent.clear(nameFilter);
  })
});

describe('3 - Crie um filtro para valores numéricos', () => {
  it('Renderize o campo para o valor do filtro', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
    render(<StarProvider><App /></StarProvider>);
    const valueFilter = await screen.findByTestId('value-filter');
    expect(valueFilter).toBeVisible();
  });

  it('Renderize o botão para executar a filtragem', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
    render(<StarProvider><App /></StarProvider>);
    const buttonFilter = await screen.findByTestId('button-filter');
    expect(buttonFilter).toBeVisible();
    
  });

  it('Verifica valores iniciais de cada campo', () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
    render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter');
    const numero = screen.getByTestId('value-filter');
    expect(coluna).toHaveValue('population');
    expect(comparison).toHaveValue('maior que');
    expect(numero).toHaveValue(0); 
  });

  it('Filtre utilizando apenas o botão de filtrar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
    render(<StarProvider><App /></StarProvider>);

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    const valueHistory = screen.getByTestId('filter')
    expect(valueHistory).toBeInTheDocument();
    
    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(10));
  });

  it('Filtre utilizando a comparação "menor que"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
    render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter');
    const numero = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    fireEvent.change(coluna, {target: { value: 'surface_water'}});
    fireEvent.change(comparison, {target: { value: 'menor que'}});
    userEvent.type(numero, '40')
    userEvent.click(buttonFilter);

    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(6));
  });

  it('Filtre utilizando a comparação "maior que"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
    render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter');
    const numero = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    fireEvent.change(coluna, {target: { value: 'diameter'}});
    fireEvent.change(comparison, {target: { value: 'maior que'}});
    userEvent.type(numero, '9000')
    userEvent.click(buttonFilter);

    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(7));
  });

  it('Filtre utilizando a comparação "igual a"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
    render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter');
    const numero = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    fireEvent.change(coluna, {target: { value: 'population'}});
    fireEvent.change(comparison, {target: { value: 'igual a'}});
    userEvent.type(numero, '200000')
    userEvent.click(buttonFilter);

    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(1));
  });
})

describe('4 - Implemente múltiplos filtros numéricos', () => {
  it('Adicione dois filtros e verifique se a tabela foi atualizada com as informações filtradas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const numero = screen.getByTestId('value-filter')
    const buttonFilter = screen.getByTestId('button-filter')
    
    fireEvent.change(coluna, {target: { value: 'diameter'}});
    fireEvent.change(comparison, {target: { value: 'maior que'}});
    userEvent.type(numero, '9000')
    userEvent.click(buttonFilter);
    
    const valueHistory = screen.getByTestId('filter')
    expect(valueHistory).toBeInTheDocument();
    const buttonDelete = screen.getByRole('button', {name: /delete/i})
    expect(buttonDelete).toBeInTheDocument();
    
    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(8));

    fireEvent.change(coluna, {target: { value: 'population'}});
    fireEvent.change(comparison, {target: { value: 'menor que'}});
    userEvent.type(numero, '1000000')
    userEvent.click(buttonFilter);
    
    waitFor(() => expect(planetName).toHaveLength(3));    
  });

  it('Adicione três filtros e verifique se a tabela foi atualizada com as informações filtradas', async () => {
     global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    })
  render(<StarProvider><App /></StarProvider>);
    const coluna = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const numero = screen.getByTestId('value-filter')
    const buttonFilter = screen.getByTestId('button-filter')
    
    fireEvent.change(coluna, {target: { value: 'diameter'}});
    fireEvent.change(comparison, {target: { value: 'maior que'}});
    userEvent.type(numero, '9000')
    userEvent.click(buttonFilter);
    
    const valueHistory = screen.getByTestId('filter')
    expect(valueHistory).toBeInTheDocument();
    const buttonDelete = screen.getByRole('button', {name: /delete/i})
    expect(buttonDelete).toBeInTheDocument();
    
    const planetName = await screen.findAllByTestId('planet-name');
    waitFor(() => expect(planetName).toHaveLength(8));

    fireEvent.change(coluna, {target: { value: 'population'}});
    fireEvent.change(comparison, {target: { value: 'menor que'}});
    userEvent.type(numero, '1000000')
    userEvent.click(buttonFilter);
    
    waitFor(() => expect(planetName).toHaveLength(3));

    fireEvent.change(coluna, {target: { value: 'rotation_period'}});
    fireEvent.change(comparison, {target: { value: 'igual a'}});
    userEvent.type(numero, '23')
    userEvent.click(buttonFilter);
    
     waitFor(() => expect(planetName).toHaveLength(2));
  });
});

// describe('5 - Não utilize filtros repetidos', () => {
//   it('Filtre por população e o remove das opções', async () => {
//     global.fetch = jest.fn().mockResolvedValue({
//         json: jest.fn().mockResolvedValue(testData)
//     })
//   render(<StarProvider><App /></StarProvider>);
//     const coluna = screen.getByTestId('column-filter')
//     const comparison = screen.getByTestId('comparison-filter')
//     const value = screen.getByTestId('value-filter')
//     const button = screen.getByTestId('button-filter')

//     waitFor(() => expect(coluna.childElementCount).toHaveLength(5));

//     fireEvent.change(coluna, {target: { value: 'population'}})
//     fireEvent.change(comparison, {target: { value: 'maior que'}})
//     userEvent.type(value, '8000')
//     userEvent.click(button)
    
//     const planetName = await screen.findAllByTestId('planet-name');
//     waitFor(() => expect(planetName).toHaveLength(7));
//     waitFor(() => expect(coluna.childElementCount).toHaveLength(4));
//   });
// });
