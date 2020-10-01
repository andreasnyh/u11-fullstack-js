import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { authService } from '../services';
import { Button, Card, CardFull, FlexRow, Form, Input, Text } from './elements';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: authService.currentUserValue
    };

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
    this.signIn().then(() => {
      history.push('/home');
    });
  }

  async signIn() {
    const { email, password } = this.state;
    // console.log('handleSubmit state', JSON.stringify(this.state, null, 2));
    const user = { email, password };
    authService.signin(user);
  }

  // eslint-disable-next-line class-methods-use-this
  /*
async signInUser(user) {
     axios
      .post('http://localhost:5000/api/auth/signin', user)
      .then((res) => {
        const { history } = this.props;
        auth.login(() => {
          localStorage.setItem('currentUser', res.data.user);
          history.push('/home');
        });
      })
      .catch((error) => {
        if (error.response) {
          const errorArray = [];
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          error.response.data.errors.forEach((err) => {
            console.log(
              'status:',
              error.response.status,
              '\nparam:',
              err.param,
              '\nError:',
              err.msg
            );
            errorArray.push({ param: err.param, mgs: err.msg });
          });

          // this.setState({
          //   errors: errorArray
          // });

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
   */

  render() {
    const { currentUser } = this.state;
    const { history, location } = this.props;

    if (currentUser) {
      return (
        <Redirect
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
