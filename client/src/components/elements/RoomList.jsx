import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line import/no-cycle
import { Button, Card, FlexRow, Image, Text } from '.';

const StyledImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const RoomList = (props) => {
  const { room, bookRoom, moreInfo } = props;

  return (
    <Card key={room._id}>
      <Text headlineSub={room.name} />
      <StyledImageContainer>
        <Image imgUrl={room.image.url} />
      </StyledImageContainer>
      <FlexRow style={{ justifyContent: 'space-around' }}>
        <span role="img" aria-label="Room for number of people">
          👥 {`${room.size.from}-${room.size.to}`}
        </span>
        <span role="img" aria-label="Cost of room">
          💰 {room.price}kr/h
        </span>
      </FlexRow>
      <Text headlineSub="Location:" text={`${room.street}\n${room.town}`} />
      {room.floor ? <Text text={`Floor: ${room.floor}`} /> : ''}
      {room.description ? (
        <Text headlineSub="Description:" text={room.description} />
      ) : (
        ''
      )}
      <FlexRow>
        <Button
          type="button"
          onClick={() => {
            moreInfo(room._id);
          }}
        >
          More Info
        </Button>
        <Button type="button" onClick={() => bookRoom(room._id)}>
          Book
        </Button>
      </FlexRow>
    </Card>
  );
};

export default RoomList;
