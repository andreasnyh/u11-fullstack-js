import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { authService } from '../services';
import { Button, Card, CardFull, FlexRow, Form, Input, Text } from './elements';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: authService.currentUserValue };

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
    const { history } = this.props;
    this.signIn();
    history.push('/home');
  }

  signIn() {
    const { email, password } = this.state;
    const user = { email, password };
    authService.signin(user);
  }

  render() {
    const { currentUser } = this.state;
    const { history, location } = this.props;

    if (currentUser !== null) {
      return (
        <Redirect
          push
          to={{
            pathname: '/home',
            state: { from: location }
          }}
        />
      );
    }
    return (
      <CardFull>
        <Text headline="Sign In Component" />
        <Card>
          <Form text="Sign In" handleSubmit={this.handleSubmit}>
            <Input
              required
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={this.handleChange}
            />
            <Input
              required
              autoComplete="currentpassword"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <FlexRow>
              <Button
                type="button"
                onClick={() => {
                  history.push('/');
                }}
              >
                Back
              </Button>
              <Button type="submit" confirm>
                Sign In
              </Button>
            </FlexRow>
          </Form>
        </Card>
      </CardFull>
    );
  }
}

export default SignIn;
