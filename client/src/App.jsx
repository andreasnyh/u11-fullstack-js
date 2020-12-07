import './App.css';

import React, { Component } from 'react';

import MainNav from './components/MainNav';
import Routes from './Routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <MainNav />
        {/*  Renders the different routes */}
        <Routes />
      </div>
    );
  }
}

export default App;
