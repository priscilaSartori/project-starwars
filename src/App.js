import React from 'react';
// import StarContext from './context/StarContext';
import Header from './components/Header';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    // <StarContext.Provider>
    <div>
      <p>Hello, App!</p>
      <Header />
      <Table />
    </div>
    // </StarContext.Provider>
  );
}

export default App;
