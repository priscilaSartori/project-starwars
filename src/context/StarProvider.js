// import React, { useMemo, useState } from 'react';
// import StarContext from './StarContext';

// export default function StarProvider({ children }) {
//   const [filtro, setFiltro] = useState([]); // mudança no input nome
//   const [selected, setSelected] = useState({
//     column: '', comparison: 'maior que', number: '0' }); // mudança no input column, comparison e number
//   const [historySelected, setHistorySelected] = useState([]); // armazena os filtros selecionados
//   const [filtrado, setFiltrado] = useState([]); // seleciona info dos filtros
//   const newArray = filtrado.length === 0 ? planetas : filtrado;
//   const [optionsColumn, setColunasOptions] = useState([
//     'population', 'orbital_period', 'rotation_period', 'diameter', 'surface_water']);

//   const values = useMemo(() => ({
//     loading,
//     planetas,
//     filtro,
//     setFiltro,
//     selected,
//     setSelected,
//     historySelected,
//     setHistorySelected,
//     filtrado,
//     setFiltrado,
//     newArray,
//     optionsColumn,
//     setColunasOptions,
//   }), [filtrado,
//     filtro,
//     historySelected,
//     newArray,
//     optionsColumn,
//     selected]);

//   return (

//   );
// }
