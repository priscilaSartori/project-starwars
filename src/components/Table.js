import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { loading, planetas } = useFetch();
  const [filtro, setFiltro] = useState([]); // mudança no input nome
  const [selected, setSelected] = useState({
    column: 'population', comparison: 'maior que', number: '0' }); // mudança no input column, comparison e number
  const [historySelected, setHistorySelected] = useState([]); // armazena os filtros selecionados
  const [filtrado, setFiltrado] = useState([]); // seleciona info dos filtros
  const newArray = filtrado.length === 0 ? planetas : filtrado;
  const [optionsColumn, setColunasOptions] = useState([
    'population',
    'orbital_period',
    'rotation_period',
    'diameter',
    'surface_water']);

  const filtraDados = (newFiltro) => {
    const filtroColuna = selected.column;
    const filtroNumero = selected.number;
    if (selected.comparison === 'maior que') {
      setFiltrado(
        newFiltro.filter((planeta) => Number(planeta[filtroColuna]) > filtroNumero),
      );
      setColunasOptions(optionsColumn.filter((column) => column !== selected.column));
    } if (selected.comparison === 'menor que') {
      setFiltrado(
        newFiltro.filter((planeta) => Number(planeta[filtroColuna]) < filtroNumero),
      );
      setColunasOptions(optionsColumn.filter((column) => column !== selected.column));
    } if (selected.comparison === 'igual a') {
      setFiltrado(newFiltro
        .filter((planeta) => Number(planeta[filtroColuna]) === Number(filtroNumero)));
      setColunasOptions(optionsColumn.filter((column) => column !== selected.column));
    }
  };

  return (
    <div>
      { loading && <h1>Carregando...</h1> }
      <form>
        <input
          data-testid="name-filter"
          type="text"
          name="filtro"
          value={ filtro }
          onChange={ ({ target }) => setFiltro(target.value) }
        />
        <select
          data-testid="column-filter"
          type="select"
          name="column"
          value={ selected.column }
          onChange={ ({ target }) => setSelected((
            prevSelected,
          ) => ({ ...prevSelected, column: target.value })) }
        >
          Coluna
          {optionsColumn.map((optionColumn, index) => (
            <option key={ index }>{optionColumn}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          type="select"
          name="comparison"
          value={ selected.comparison }
          onChange={ ({ target }) => setSelected((
            prevSelected,
          ) => ({ ...prevSelected, comparison: target.value })) }
        >
          Operador
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="number"
          value={ selected.number }
          onChange={ ({ target }) => setSelected((
            prevSelected,
          ) => ({ ...prevSelected, number: target.value })) }
        />
        <button
          data-testid="button-filter"
          type="button"
          name="filtro"
          onClick={ () => {
            setHistorySelected((prevPrevSelected) => ([...prevPrevSelected, selected]));
            const newFiltro = filtrado.length === 0 ? planetas : filtrado;
            filtraDados(newFiltro);
            setSelected({ column: 'population', comparison: 'maior que', number: '0' });
          } }
        >
          Filtrar
        </button>
      </form>
      {historySelected.map((history, index) => (
        <div key={ index }>
          <span>
            {history.column}
            {' '}
            {history.comparison}
            {' '}
            {history.number}
          </span>
        </div>
      )) }
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {newArray
            .filter((linha) => linha.name.includes(filtro))
            .map((planeta) => (
              <tr key={ planeta.name }>
                <td>{planeta.name}</td>
                <td>{planeta.rotation_period}</td>
                <td>{planeta.orbital_period}</td>
                <td>{planeta.diameter}</td>
                <td>{planeta.climate}</td>
                <td>{planeta.gravity}</td>
                <td>{planeta.terrain}</td>
                <td>{planeta.surface_water}</td>
                <td>{planeta.population}</td>
                <td>{planeta.films}</td>
                <td>{planeta.created}</td>
                <td>{planeta.edited}</td>
                <td>{planeta.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
