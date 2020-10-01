import './App.css';

import React, { Component } from 'react';

import MainNav from './components/MainNav';
import Routes from './Routes';
// import { authService } from './services';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*
   componentDidMount() {
    if (authService.currentUser) {
      authService.currentUser.subscribe((user) =>
        user ? this.setState({ currentUser: user }) : this.setState({ currentUser: null })
      );
    }
  } */

  render() {
    // const { currentUser } = this.state;
    return (
      <div className="App">
        <MainNav />
        {/*  Renders the different routes */}
        <Routes /* currentUser={currentUser} */ />
      </div>
    );
  }
}

export default App;
