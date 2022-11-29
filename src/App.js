import { useState, useMemo } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import StarContext from './context/StarContext';

function App({ children }) {
  const [filtro, setFiltro] = useState([]); // mudança no input nome
  const [selected, setSelected] = useState({
    column: 'population', comparison: 'maior que', number: '0' }); // mudança no input column, comparison e number
  const [historySelected, setHistorySelected] = useState([]); // armazena os filtros selecionados
  const [filtrado, setFiltrado] = useState([]); // seleciona info dos filtros
  const [optionsColumn, setColunasOptions] = useState([
    'population', 'orbital_period', 'rotation_period', 'diameter', 'surface_water']);
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
      <div>
        <p>Hello, App!</p>
        <Header />
        <Table />
      </div>
    </StarContext.Provider>
  );
}
App.propTypes = {}.isRequired;

export default App;
