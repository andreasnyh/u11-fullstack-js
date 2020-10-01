import React, { Component } from 'react';

import { Text } from './elements';

class AccessRestricted extends Component {
  constructor(props) {
    super(props);
    this.location = props.location;
  }

  componentDidMount() {
    // Use of <Redirect /> not working
    this.timeout = setTimeout(() => {
      window.location = `${window.location.origin}/signin`;
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { msg } = this.props;
    return <Text headline="Access Denied" text={msg} />;
  }
}

export default AccessRestricted;
