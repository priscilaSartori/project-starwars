import React from 'react';
import Filtros from './Filtros';
import Ordernar from './Ordernar';
import History from './History';

function Header() {
  return (
    <div>
      <Filtros />
      <Ordernar />
      <History />
    </div>
  );
}

export default Header;
