import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { planetas } = useFetch();
  const [filtro, setFiltro] = useState([]);
  const [selected, setSelected] = useState({ column: 0, comparison: 0, number: 0 });
  console.log(selected);
  const [selectedFilters, setSelectedFilters] = useState([]);
  console.log(selectedFilters);
  return (
    <div>
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="rotation_period">rotation_period</option>
          <option value="diameter">diameter</option>
          <option value="surface_water">surface_water</option>
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
          ) => ({ ...prevSelected, number: Number(target.value) })) }
        />
        <button
          data-testid="button-filter"
          type="submit"
          name="filtro"
          // onChange={ setSelectedFilters(selected) }
          onClick={ () => {
            setSelectedFilters((prevSelected) => ([
              ...prevSelected, selected,
            ]));
          // setSelected({ column: 0, comparison: 0, numero: 0 });
          } }
        >
          Filtrar
        </button>
      </form>
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
          {planetas
            .filter((linha) => linha.name.includes(filtro))
            // .filter((linha) => console.log(Object.keys(linha)))
            .map((planeta) => (
              <tr key={ planeta.name }>
                <td>{planeta.name}</td>
                <td>{planeta.rotation_period}</td>
                <td>{planeta.orbital_period}</td>
                <td>{planeta.diameter}</td>
                <td>{planeta.climate}</td>
                <td>{planeta.gravity}</td>
                <td>{planeta.terrain}</td>
                <td>{planeta.surface_water === 'unknown' ? 0 : planeta.surface_water}</td>
                <td>{planeta.population === 'unknown' ? 0 : planeta.population}</td>
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
