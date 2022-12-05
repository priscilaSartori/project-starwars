import { useState, useMemo } from 'react';
import { node } from 'prop-types';
import StarContext from './StarContext';

function StarProvider({ children }) {
  const [filtro, setFiltro] = useState([]); // mudança no input nome
  const [selected, setSelected] = useState({
    column: 'population', comparison: 'maior que', number: '0' }); // mudança no input column, comparison e number
  const [historySelected, setHistorySelected] = useState([]); // armazena os filtros selecionados
  const [filtrado, setFiltrado] = useState([]); // seleciona info dos filtros
  const [optionsColumn, setColunasOptions] = useState([
    'surface_water', 'diameter', 'orbital_period', 'rotation_period', 'population']);
  const [selectedColumn, setSelectedColumn] = useState([]);
  const [optionsColumnSort, setColunasOptionsSort] = useState([
    'surface_water', 'diameter', 'orbital_period', 'rotation_period', 'population']);

  const values = useMemo(() => ({
    filtro,
    setFiltro,
    selected,
    setSelected,
    historySelected,
    setHistorySelected,
    filtrado,
    setFiltrado,
    optionsColumn,
    setColunasOptions,
    optionsColumnSort,
    setColunasOptionsSort,
    selectedColumn,
    setSelectedColumn,
  }), [filtrado,
    filtro,
    optionsColumnSort,
    historySelected,
    optionsColumn,
    selectedColumn,
    selected]);

  return (
    <StarContext.Provider value={ values }>
      {children}
    </StarContext.Provider>
  );
}
StarProvider.propTypes = {
  children: node.isRequired,
};

export default StarProvider;
