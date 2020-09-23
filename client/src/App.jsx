import './App.css';

import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Button from './components/Button';
import SignIn from './components/SignIn';
// import Card from './components/Card';
import SignUp from './components/SignUp';

// import logo from './logo.svg';

function App() {
  return (
    <Router>
      <div className="welcome">
        <h1>Welcome</h1>
        <Link to="/signup">
          <Button>Register</Button>
        </Link>
        <Link to="/signin">
          <Button lightMode>Log in</Button>
        </Link>
      </div>

      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
