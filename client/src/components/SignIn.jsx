import React, { Component } from 'react';
import styled from 'styled-components';

import Button from './Button';
import Form from './Form';
import Input from './Input';

const StyledSignIn = styled.div`
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

class SignIn extends Component {
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
        <StyledSignIn>
          <h2>Sign In Component</h2>
          <Form text="Sign In">
            <Input type="email" name="email" placeholder="E-mail" onChange={this.handleChange} />
            <Input
              type="text"
              name="password"
              placeholder="Password"
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
              Sign In
            </Button>
          </StyledButtons>
        </StyledSignIn>
      </StyledWrapper>
    );
  }
}

export default SignIn;
