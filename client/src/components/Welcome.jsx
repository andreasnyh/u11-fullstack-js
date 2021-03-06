import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import image from '../assets/illustrations/meeting_splash.png';
import { Colors } from '../config/ColorsShadows';
import { Button } from './elements';
import SplashImage from './elements/SplashImage';

const StyledWelcome = styled.div`
  top: 50%;
  bottom: 0;
  width: 100%;
  padding: 2em;
  display: flex;
  margin: 0 auto;
  position: absolute;
  align-items: center;
  color: ${Colors.Text};
  flex-direction: column;
  border-radius: 30px 30px 0 0;
  background-color: ${Colors.Dark};
`;

const StyledContainer = styled.div`
  width: 100vw;
  height: 60vh;
  overflow: hidden;
  position: relative;
`;

const StyledText = styled.h1`
  width: 100vw;
  opacity: 0.7;
  margin-top: 5rem;
  padding: 0.5rem 0;
  background-color: ${Colors.Dark};
`;

const Welcome = () => {
  const history = useHistory();
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser !== null) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <StyledContainer>
        <StyledText>Welcome!</StyledText>
        <SplashImage imgUrl={image} />
      </StyledContainer>
      <StyledWelcome>
        {/* Margins to center buttons vertically */}

        <Button
          history
          confirm
          style={{ marginTop: 'auto' }}
          onClick={() => {
            history.push('/signup');
          }}
        >
          Register
        </Button>
        <Button
          history
          style={{ marginBottom: 'auto' }}
          onClick={() => {
            history.push('/signin');
          }}
        >
          Log in
        </Button>
      </StyledWelcome>
    </>
  );
};

export default Welcome;
