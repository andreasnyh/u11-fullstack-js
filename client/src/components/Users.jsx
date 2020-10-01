import React, { Component } from 'react';

import { /* authService, */ userService } from '../services';
import AccessRestricted from './AccessRestricted';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentUser: authService.currentUserValue,
      users: null
    };
  }

  componentDidMount() {
    userService
      .getAll()
      .then((users) => {
        console.log(users);
        this.setState({ users });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { users } = this.state;
    console.log(users);
    if (users !== null && users[0].status) {
      console.log(users[0]);
      return <AccessRestricted msg={users[0].msg} />;
    }

    return users ? (
      users.map((user) => {
        console.log(user);
        // eslint-disable-next-line no-underscore-dangle
        return <p key={user._id}>{`${user._id}\n`}</p>;
      })
    ) : (
      <p>Loading</p>
    );
  }
}
export default Users;
