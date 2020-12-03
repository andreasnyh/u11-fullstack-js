import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { authService } from '../services';
import {
  Button,
  Card,
  CardFull,
  FlexRow,
  Form,
  Input,
  Label,
  Loading,
  Text
} from './elements';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: authService.currentUserValue, loading: false };

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
    this.setState({ loading: true });
    this.signIn()
      .then((res) => {
        this.setState({ loading: false });
        console.log(res);
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  async signIn() {
    const { email, password } = this.state;
    const user = { email, password };
    return authService.signin(user);
  }

  render() {
    const { currentUser, loading } = this.state;
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
    return loading ? (
      <Loading />
    ) : (
      <CardFull>
        <Text headline="Sign In" />
        <Card>
          <Form handleSubmit={this.handleSubmit}>
            <Label>
              Email
              <Input
                required
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Password
              <Input
                required
                autoComplete="currentpassword"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Label>
            <FlexRow>
              <Button
                type="button"
                onClick={() => {
                  history.goBack();
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
