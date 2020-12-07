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
      errors: [],
      roles: ['user'],
      roleUser: true,
      roleAdmin: false,
      currentUser: JSON.parse(localStorage.getItem('currentUser'))
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // fix this checkbox state "on"
  handleRoleChange() {
    this.setState((prevState) => ({
      roleAdmin: !prevState.roleAdmin,
      roles: prevState.roleAdmin === true ? ['user'] : ['user', 'admin']
    }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.registerUser(this.state);
  }

  async registerUser(user) {
    const { currentUser } = this.state;
    axios
      .post(`${apiUrl}/auth/signup`, user)
      .then(() => {
        const { history } = this.props;
        if (currentUser) history.goBack();
        history.push('/signup/thankyou');
      })
      .catch((error) => {
        if (error.response) {
          const errorArray = [];
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          error.response.data.errors.forEach((err) => {
            errorArray.push({ param: err.param, mgs: err.msg });
          });

          console.log(errorArray);
          this.setState({
            errors: errorArray
          });
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
    const {
      currentUser,
      firstName,
      lastName,
      email,
      password,
      passwordAgain,
      roleAdmin
    } = this.state;

    return (
      <CardFull static>
        <Text headline="Register new user" />
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

            {currentUser && currentUser.user.roles.includes('ROLE_ADMIN') && (
              <Label>
                Set Roles
                <FlexRow style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Label>
                    User
                    <Input
                      required
                      type="checkbox"
                      name="roleUser"
                      checked
                      disabled
                    />
                  </Label>
                  <Label>
                    Admin
                    <Input
                      required
                      type="checkbox"
                      name="roleAdmin"
                      checked={roleAdmin}
                      onChange={this.handleRoleChange}
                    />
                  </Label>
                </FlexRow>
              </Label>
            )}

            <FlexRow>
              <Button
                onClick={() => {
                  history.goBack();
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
