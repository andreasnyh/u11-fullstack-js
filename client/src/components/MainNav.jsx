import React from 'react';

// import { Button } from './elements';
import { authService } from '../services';

const logOut = () => {
  authService.logout();
};

const MainNav = () => {
  const currentUser = localStorage.getItem('currentUser');
  return (
    currentUser && (
      <button type="button" onClick={logOut}>
        Log Out
      </button>
    )
  );
};

export default MainNav;
