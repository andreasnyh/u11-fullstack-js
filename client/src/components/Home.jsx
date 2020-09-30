import React, { Component } from 'react';

import { Button, Card, CardFull, FlexRow, Image, Text } from './elements';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <CardFull>
        <Text headline="Need a meeting room?" />
        <Card>
          <Image
            imgUrl="https://via.placeholder.com/600x400?text=No+image+of+room"
            width="300px"
            height="200px"
          />
          <FlexRow style={{ justifyContent: 'space-around' }}>
            <span role="img" aria-label="Room for number of people">
              👥 5-10
            </span>
            <span role="img" aria-label="Cost of room">
              💰 100kr/h
            </span>
          </FlexRow>
          <FlexRow>
            <Button type="button">More Info</Button>
            <Button type="button">Book</Button>
          </FlexRow>
        </Card>
      </CardFull>
    );
  }
}

export default Home;
