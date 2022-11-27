import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockPlanetas from './mockPlanetas';

describe('1 - Faça uma requisição para o endpoint `/planets` da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos da coluna `residents`', () => {
  // it('Realize uma requisição para a API', () => {
  // global.fetch = jest.fn(async () => ({
  //     json: async () => testPlanets
  //   }));

  //   render(
  //     <DataProvider>
  //       <App />
  //     </DataProvider>
  //   );

  //   expect(global.fetch).toHaveBeenCalled();
  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');  
  // });

  it('Verifique se todos os inputs e o button são exibidos', () => {
    render(<App />);
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
    render(<App />);
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

  // it('Verifique se a tabela tem uma linha para cada planeta retornado', () => {
  //   render(<App />);
  //   const tr = screen.getAllByRole('tr');
  //   expect(tr).toHaveLength(11);
  // });

  // it('Verifique se é renderizado todos os planetas na tabela', async () => {
  // render(<App />);
  //   const tatooine = await screen.getByTitle('Tatooine');
  //   expect(tatooine).toBeInTheDocument();
  //   const alderaan = await screen.findByText('Alderaan');
  //   expect(alderaan).toBeInTheDocument();
  //   const yavin = await screen.findByText(/Yavin IV/i);
  //   expect(yavin).toBeInTheDocument();
  //   const hoth = await screen.findByText('Hoth');
  //   expect(hoth).toBeInTheDocument();
  //   const dagobah = await screen.findByText('Dagobah');
  //   expect(dagobah).toBeInTheDocument();
  //   const bespin = await screen.findByText('Bespin');
  //   expect(bespin).toBeInTheDocument();
  //   const endor = await screen.findByText('Endor');
  //   expect(endor).toBeInTheDocument();
  //   const naboo = await screen.findByText('Naboo');
  //   expect(naboo).toBeInTheDocument();
  //   const coruscant = await screen.findByText('Coruscant');
  //   expect(coruscant).toBeInTheDocument();
  //   const kamino = await screen.findByText('Kamino');
  //   expect(kamino).toBeInTheDocument();
  // });

// describe('2 - Crie um filtro de texto para a tabela', () => {
//   it('Filtre os planetas que possuem a letra "o" no nome', () => {
  
//   });

//   it('Filtre planetas que possuem a letra "oo" no nome', () => {
  
//   });

//   it('Faça vários filtros em sequência', () => {
  
//   })
// });

// describe('3 - Crie um filtro para valores numéricos', () => {
//   it('Renderize o filtro de coluna', () => {
//     const options = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
//     const coluna = screen.getByTestId('column-filter', {name: 'population'})
//     userEvent.selectOptions(screen.getByRole('listbox'), ['population']);
//     expect(coluna.selected).toBe(true)
//   });

//   it('Renderize o filtro de comparação', () => {
//     const options = ['maior que', 'menor que', 'igual a'];
 
//   });

//   it('Renderize o campo para o valor do filtro', () => {
 
//   });

//   it('Renderize o botão para executar a filtragem', () => {
 
//   });

//   it('Verifica valores iniciais de cada campo', () => {
 
//   });

//   it('Filtre utilizando apenas o botão de filtrar', () => {
 
//   });

//   it('Filtre utilizando a comparação "menor que"', () => {
 
//   });

//   it('Filtre utilizando a comparação "maior que"', () => {
 
//   });

//   it('Filtre utilizando a comparação "igual a"', () => {
 
//   });
// })
});
