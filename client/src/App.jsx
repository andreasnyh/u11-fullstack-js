import './App.css';

import React from 'react';

import Routes from './Routes';

// import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <h1>This could be a {'<nav> component'}</h1>
      {/*  Renders the different routes */}
      <Routes />
    </div>
  );
}

export default App;
