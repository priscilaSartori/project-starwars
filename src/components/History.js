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
    const historyAtualizado = historySelected
      .filter((filterSelected) => filterSelected.column !== history.column);
    if (historyAtualizado.length !== 0) {
      historyAtualizado.forEach((atualizar) => {
        if (atualizar.comparison === 'maior que') {
          setFiltrado(planetas.filter(
            (planeta) => Number(planeta[atualizar.column]) > atualizar.number,
          ));
        } else if (atualizar.comparison === 'menor que') {
          setFiltrado(planetas
            .filter((planeta) => Number(planeta[atualizar.column]) < atualizar.number));
        } else if (atualizar.comparison === 'igual a') {
          setFiltrado(planetas.filter(
            (planeta) => Number(planeta[atualizar.column]) === Number(atualizar.number),
          ));
        }
      });
    } else {
      setFiltrado(planetas);
    }
  };

  const removeItem = (history) => {
    removeFiltraDados(history);
    setHistorySelected(historySelected
      .filter((filterSelected) => filterSelected.column !== history.column));
    setColunasOptions((prevColunasOptions) => (
      [...prevColunasOptions, history.column]));
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
            data-testid={ history.column }
            name={ history.column }
            value={ history.column }
            onClick={ () => removeItem(history) }
          >
            Delete
          </button>
        </div>
      )) }
    </div>
  );
}

export default History;
