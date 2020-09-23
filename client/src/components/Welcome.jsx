import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';
import SplashImage from './SplashImage';

const StyledWelcome = styled.div`
  top: 50%;
  bottom: 0;
  width: 100%;
  padding: 2em 1em;
  margin: 0 auto;
  background-color: lightGray;
  border-radius: 20px 20px 0 0;
  position: absolute;
  display: flex;
  flex-direction: column;
`;

const Welcome = () => {
  return (
    <>
      <SplashImage imgUrl="https://via.placeholder.com/414x414" />
      <StyledWelcome>
        <h2>Welcome Component!</h2>
        {/* Margins to center buttons vertically */}
        <Link to="/signup" style={{ 'margin-top': 'auto' }}>
          <Button>Register</Button>
        </Link>
        <Link to="/signin" style={{ 'margin-bottom': 'auto' }}>
          <Button>Log in</Button>
        </Link>
      </StyledWelcome>
    </>
  );
};

export default Welcome;
