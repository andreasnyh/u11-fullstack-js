import React, { Component } from 'react';

import { Button, Card, CardFull, FlexRow, Form, Input, Text } from './elements';

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
      <CardFull>
        <Text headline="Sign In Component" />
        <Card>
          <Form text="Sign In">
            <Input type="email" name="email" placeholder="E-mail" onChange={this.handleChange} />
            <Input
              type="text"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <FlexRow>
              <Button
                onClick={() => {
                  history.push('/');
                }}
              >
                Back
              </Button>
              <Button type="submit" confirm onClick={this.handleSubmit}>
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
