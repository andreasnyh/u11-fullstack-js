import React, { Component } from 'react';
import styled from 'styled-components';

import Button from './Button';
import Form from './Form';
import Input from './Input';

const StyledSignUp = styled.div`
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  padding: 2em 1em;
  position: absolute;
  height: calc(100% - 21px);
  background-color: lightPink;
  border-radius: 30px 30px 0 0;
`;

const StyledButtons = styled.div`
  display: flex;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
    const { history } = this.props;
    return (
      <StyledWrapper>
        <StyledSignUp>
          <h2>Sign Up Component</h2>
          <Form text="Register">
            <Input
              type="text"
              name="firstName"
              placeholder="First name"
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={this.handleChange}
            />
            <Input type="email" name="email" placeholder="E-mail" onChange={this.handleChange} />
            <Input
              type="text"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="passwordAgain"
              placeholder="Repeat password"
              onChange={this.handleChange}
            />
          </Form>
          <StyledButtons>
            <Button
              style={{ marginTop: 'auto' }}
              onClick={() => {
                history.push('/');
              }}
            >
              Back
            </Button>
            <Button type="submit" lightMode onClick={this.handleSubmit}>
              Register
            </Button>
          </StyledButtons>
        </StyledSignUp>
      </StyledWrapper>
    );
  }
}

export default SignUp;
