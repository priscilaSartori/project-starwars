import React, { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import StarContext from '../context/StarContext';

function Ordernar() {
  const { planetas } = useFetch();
  const {
    optionsColumnSort,
    filtrado,
    setFiltrado,
    selectedColumn,
    setSelectedColumn,
  } = useContext(StarContext);
  const newFiltro = filtrado.length === 0 ? planetas : filtrado;

  const ordenaDados = () => {
    const coluna = selectedColumn.column;
    const unknown = newFiltro.filter((info) => info[coluna] !== 'unknown');
    if (selectedColumn.sort === 'ASC') {
      const sort = unknown.sort((a, b) => a[coluna] - b[coluna]);
      setFiltrado(sort);
    } if (selectedColumn.sort === 'DESC') {
      const sort = unknown.sort((a, b) => b[coluna] - a[coluna]);
      setFiltrado(sort);
    }
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        type="select"
        name="column"
        value={ selectedColumn.column }
        onChange={ ({ target }) => setSelectedColumn(
          { ...selectedColumn, column: target.value },
        ) }
      >
        Ordenar
        {optionsColumnSort.map((optionColumn, index) => (
          <option key={ index }>{optionColumn}</option>
        ))}
      </select>
      <label htmlFor="ASC">
        Ascendente
        <input
          type="radio"
          name="ASC-DESC"
          id="ASC"
          data-testid="column-sort-input-asc"
          onChange={ () => setSelectedColumn({ ...selectedColumn, sort: 'ASC' }) }
        />
      </label>
      <label htmlFor="DESC">
        Descendente
        <input
          type="radio"
          name="ASC-DESC"
          id="DESC"
          data-testid="column-sort-input-desc"
          onChange={ () => setSelectedColumn({ ...selectedColumn, sort: 'DESC' }) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => { ordenaDados(); } }
      >
        Ordernar
      </button>
    </div>
  );
}

export default Ordernar;
