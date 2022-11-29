import React, { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import StarContext from '../context/StarContext';

function Header() {
  const { loading, planetas } = useFetch();
  const {
    filtro,
    selected,
    setFiltro,
    setSelected,
    historySelected,
    setHistorySelected,
    filtrado,
    setFiltrado,
    optionsColumn,
    setColunasOptions,
  } = useContext(StarContext);
  const newArray = filtrado.length === 0 ? planetas : filtrado;

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
  const removeFiltraDados = (history) => {
    const igual = planetas.filter((planeta) => (Number(planeta[history
      .column]) === Number(history.number)));
    const menor = planetas.filter((planeta) => (Number(planeta[history
      .column]) < history.number));
    const maior = planetas.filter((planeta) => (Number(planeta[history
      .column]) > history.number));
    if (history.comparison === 'maior que') {
      const somaMenor = [...menor, igual[0]];
      somaMenor.map((restauraMenor) => setFiltrado(
        (prevFiltrado) => ([...prevFiltrado, restauraMenor]),
      ));
    } if (history.comparison === 'menor que') {
      const somaMaior = [...maior, igual[0]];
      somaMaior.map((restauraMaior) => setFiltrado(
        (prevFiltrado) => ([...prevFiltrado, restauraMaior]),
      ));
    } if (history.comparison === 'igual a') {
      planetas.filter((planeta) => Number(planeta[history
        .column]) !== Number(history.number))
        .map((restaura) => setFiltrado((prevFiltrado) => ([...prevFiltrado, restaura])));
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
      {historySelected.map((history, index) => (
        <div key={ index } data-testid="filter">
          <span>
            {history.column}
            {' '}
            {history.comparison}
            {' '}
            {history.number}
          </span>
          <button
            type="button"
            name={ history.column }
            value={ history.column }
            onClick={ () => {
              removeFiltraDados(history);
              setHistorySelected(historySelected
                .filter((filterSelected) => filterSelected.column !== history.column));
              setColunasOptions((prevColunasOptions) => (
                [...prevColunasOptions, history.column]));
            } }
          >
            Delete
          </button>
        </div>
      )) }
    </div>
  );
}

export default Header;
