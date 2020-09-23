import './App.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import Button from './components/Button';
import Routes from './Routes';

// import logo from './logo.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>This could be a {'<nav> component'}</h1>
        <Routes />
      </div>
    </Router>
  );
}

export default App;
