import React, { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import StarContext from '../context/StarContext';

function History() {
  const { planetas } = useFetch();
  const {
    historySelected,
    setHistorySelected,
    setFiltrado,
    setColunasOptions,
  } = useContext(StarContext);

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

export default History;
