import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { authService } from '../services';
// eslint-disable-next-line import/no-cycle
import { Calendar, Card, FlexRow, Image, Text } from './elements';

const StyledImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const RoomDetail = (props) => {
  const { room } = props;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(authService.currentUserValue).user.id;
    setUserId(user);
  }, []);

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
        <Calendar roomId={room._id} userId={userId} />
      </FlexRow>
    </Card>
  );
};

export default RoomDetail;
