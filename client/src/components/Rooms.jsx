import React from 'react';
import styled from 'styled-components';

import { roomService } from '../services';
import { Button, Card, FlexRow, Image, Text } from './elements';

const StyledImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const moreInfo = (id) => {
  console.log(id);
  roomService.getOne(id).then((roomInfo) => console.log(roomInfo));
};

const bookRoom = (id) => {
  console.log(id);
};

const Rooms = (props) => {
  const { rooms } = props;

  return rooms.map((room) => {
    return (
      <Card key={room._id}>
        <Text headlineSub={room.name} />
        <StyledImageContainer>
          <Image
            imgUrl={room.image.url}
            // width="300px"
            // height="200px"
          />
        </StyledImageContainer>
        <FlexRow style={{ justifyContent: 'space-around' }}>
          <span role="img" aria-label="Room for number of people">
            👥 {`${room.size.from}-${room.size.to}`}
          </span>
          <span role="img" aria-label="Cost of room">
            💰 {room.price}kr/h
          </span>
        </FlexRow>
        <Text text={`${room.street}\n${room.town}`} />
        {room.floor ? <Text text={`Floor: ${room.floor}`} /> : ''}
        <FlexRow>
          <Button type="button" onClick={() => moreInfo(room._id)}>
            More Info
          </Button>
          <Button type="button" onClick={() => bookRoom(room._id)}>
            Book
          </Button>
        </FlexRow>
      </Card>
    );
  });
};

export default Rooms;
