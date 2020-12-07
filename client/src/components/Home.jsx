import React, { Component } from 'react';

import { authService, roomService } from '../services';
import { CardFull, Loading, Text } from './elements';
import Rooms from './Rooms';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: JSON.parse(authService.currentUserValue)
    };
  }

  componentDidMount() {
    roomService.getAll().then((rooms) => {
      this.setState({ rooms });
    });
  }

  render() {
    const { currentUser, rooms } = this.state;
    return rooms === undefined || currentUser === undefined ? (
      <Loading />
    ) : (
      <CardFull static>
        <Text
          headline={
            currentUser.user
              ? `Need a room ${currentUser.user.firstName}?`
              : 'Need a room?'
          }
        />
        <Rooms rooms={rooms} />
      </CardFull>
    );
  }
}

export default Home;
