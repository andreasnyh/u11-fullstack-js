import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';
import Form from './Form';
import Input from './Input';

const StyledSignUp = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2em 1em;
  margin: 0 auto;
  background-color: lightPink;
  border-radius: 30px 30px 0 0;
`;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.state, null, 2));
  }

  render() {
    return (
      <StyledSignUp>
        <h2>Sign Up Component</h2>
        <Form text="Register">
          <Input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={this.handleChange}
          />
          <Input type="text" name="lastName" placeholder="Last name" onChange={this.handleChange} />
          <Input type="email" name="email" placeholder="E-mail" onChange={this.handleChange} />
          <Input type="text" name="password" placeholder="Password" onChange={this.handleChange} />
          <Input
            type="text"
            name="passwordAgain"
            placeholder="Repeat password"
            onChange={this.handleChange}
          />
        </Form>
        <Link to="/">
          <Button lightMode>Back</Button>
        </Link>
        {/* <Link to="/"> */}
        <Button type="submit" lightMode onClick={this.handleSubmit}>
          Register
        </Button>
        {/* </Link> */}
      </StyledSignUp>
    );
  }
}

export default SignUp;
