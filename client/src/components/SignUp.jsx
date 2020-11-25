import axios from 'axios';
import React, { Component } from 'react';

import config from '../config/config.json';
import {
  Button,
  Card,
  CardFull,
  FlexRow,
  Form,
  Input,
  Label,
  Text
} from './elements';

const apiUrl =
  process.env.NODE_ENV !== 'production' ? config.apiUrl : config.apiUrlProd;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      passwordAgain: '',
      email: '',
      errors: []
    };

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
      .post(`${apiUrl}/auth/signup`, user)
      .then((res) => {
        const { history } = this.props;
        console.log(res);
        console.log(res.data);
        history.push('/signup/thankyou');
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

          console.log(errorArray);
          this.setState({
            errors: errorArray
          });

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
      <CardFull static>
        <Text headline="Register" />
        <Card>
          <Form handleSubmit={this.handleSubmit}>
            <Label>
              First name
              <Input
                type="text"
                name="firstName"
                value={firstName}
                placeholder="First name"
                required
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Last name
              <Input
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Last name"
                required
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Email
              <Input
                required
                type="email"
                name="email"
                value={email}
                placeholder="E-mail"
                autoComplete="email"
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Password
              <Input
                required
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                autoComplete="new-password"
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Repeat password
              <Input
                required
                type="password"
                name="passwordAgain"
                value={passwordAgain}
                autoComplete="new-password"
                placeholder="Repeat password"
                onChange={this.handleChange}
              />
            </Label>

            <FlexRow>
              <Button
                onClick={() => {
                  history.push('/');
                }}
              >
                Back
              </Button>

              <Button type="submit" confirm>
                Register
              </Button>
            </FlexRow>
          </Form>
        </Card>
      </CardFull>
    );
  }
}

export default SignUp;
