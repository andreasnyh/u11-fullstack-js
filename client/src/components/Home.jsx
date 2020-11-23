import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { authService, roomService } from '../services';
import { Button, CardFull, Loading, Text } from './elements';
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
        <Link to="/admin">
          <Button style={{ width: '100%' }} href="/admin">
            Dash
          </Button>
        </Link>
        <Text
          headline={
            currentUser.user
              ? `Need a meeting room ${currentUser.user.firstName}?`
              : 'Need a meeting room?'
          }
        />
        {/* <Calendar /> */}
        <Rooms rooms={rooms} />
      </CardFull>
    );
  }
}

export default Home;
