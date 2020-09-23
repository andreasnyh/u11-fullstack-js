import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';
import Form from './Form';

const StyledSignUp = styled.div`
  width: 100%;
  padding: 2em 1em;
  margin: 0 auto;
  background-color: lightPink;
  border-radius: 30px 30px 0 0;
`;

const SignUp = () => {
  return (
    <StyledSignUp>
      <h2>Sign Up Component</h2>
      <Form text="Register">
        <input type="text" name="firstName" placeholder="First name" />
        <input type="text" name="lastName" placeholder="Last name" />
        <input type="email" name="email" placeholder="E-mail" />
        <input type="text" name="password" placeholder="Password" />
        <input type="text" name="passwordAgain" placeholder="Repeat password" />
      </Form>
      <Link to="/">
        <Button lightMode>Back</Button>
      </Link>
      <Link to="/">
        <Button lightMode>Register</Button>
      </Link>
    </StyledSignUp>
  );
};

export default SignUp;
