import React, { Component } from 'react';

import { Text } from './elements';

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.location = props.location;
  }

  componentDidMount() {
    // Use of <Redirect /> not working
    this.timeout = setTimeout(() => {
      window.location = `${window.location.origin}/`;
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return <Text headline="Welcome Back!" />;
  }
}

export default SignOut;
