import './App.css';

import React from 'react';

import Routes from './Routes';

// import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <p>This could be a {'<nav> component'}</p>
      {/*  Renders the different routes */}
      <Routes />
    </div>
  );
}

export default App;
