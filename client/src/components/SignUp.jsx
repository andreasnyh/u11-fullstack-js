import axios from 'axios';
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
    this.state = { firstName: '', lastName: '', password: '', passwordAgain: '', email: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit state', JSON.stringify(this.state, null, 2));
    await this.registerUser(this.state);
  }

  // eslint-disable-next-line class-methods-use-this
  async registerUser(user) {
    axios
      .post('http://localhost:5000/api/auth/signup', user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          error.response.data.errors.map((err) =>
            console.log(
              'status:',
              error.response.status,
              '\nparam:',
              err.param,
              '\nError:',
              err.msg
            )
          );
          // console.log(error.response.status);
          // console.log(error.response.data);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        // console.log(error.config);
      });
  }

  render() {
    const { history } = this.props;
    const { firstName, lastName, email, password, passwordAgain } = this.state;
    return (
      <StyledWrapper>
        <StyledSignUp>
          <h2>Sign Up Component</h2>
          <Form text="Register" handleSubmit={this.handleSubmit}>
            <Input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="First name"
              required
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Last name"
              required
              onChange={this.handleChange}
            />
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="E-mail"
              onChange={this.handleChange}
              required
            />
            <Input
              type="text"
              name="password"
              value={password}
              placeholder="Password"
              required
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="passwordAgain"
              value={passwordAgain}
              placeholder="Repeat password"
              required
              onChange={this.handleChange}
            />

            <StyledButtons>
              <Button
                style={{ marginTop: 'auto' }}
                onClick={() => {
                  history.push('/');
                }}
              >
                Back
              </Button>
              <Button type="submit" lightMode>
                Register
              </Button>
            </StyledButtons>
          </Form>
        </StyledSignUp>
      </StyledWrapper>
    );
  }
}

export default SignUp;
