import React, { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import StarContext from '../context/StarContext';

function Filtros() {
  const { loading, planetas } = useFetch();
  const {
    filtro,
    selected,
    setFiltro,
    setSelected,
    setHistorySelected,
    filtrado,
    setFiltrado,
    optionsColumn,
    setColunasOptions,
  } = useContext(StarContext);

  const filtraDados = (newFiltro) => {
    if (selected.comparison === 'maior que') {
      setFiltrado(
        newFiltro.filter((planeta) => Number(planeta[selected.column]) > selected.number),
      );
    } if (selected.comparison === 'menor que') {
      setFiltrado(
        newFiltro.filter((planeta) => Number(planeta[selected.column]) < selected.number),
      );
    } if (selected.comparison === 'igual a') {
      setFiltrado(newFiltro.filter(
        (planeta) => Number(planeta[selected.column]) === Number(selected.number),
      ));
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
          onClick={ () => {
            setHistorySelected((prevPrevSelected) => ([...prevPrevSelected, selected]));
            const newFiltro = filtrado.length === 0 ? planetas : filtrado;
            filtraDados(newFiltro);
            setSelected({ column: optionsColumn[1],
              comparison: 'maior que',
              number: '0' });
            setColunasOptions(optionsColumn
              .filter((column) => column !== selected.column));
          } }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setFiltrado(planetas);
            setHistorySelected([]);
            setColunasOptions(['population', 'orbital_period',
              'rotation_period', 'diameter', 'surface_water']);
          } }
        >
          Remover Filtros
        </button>
      </form>
    </div>
  );
}

export default Filtros;
