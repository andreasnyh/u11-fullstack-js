import React, { Component } from 'react';

import { Text } from './elements';

class AccessRestricted extends Component {
  constructor(props) {
    super(props);
    this.location = props.location;
  }

  componentDidMount() {
    const { history } = this.props;
    // Use of <Redirect /> not working
    this.timeout = setTimeout(() => {
      history.goBack();
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { msg } = this.props;
    return <Text headline="Access Denied" headlineSub={msg} />;
  }
}

export default AccessRestricted;
