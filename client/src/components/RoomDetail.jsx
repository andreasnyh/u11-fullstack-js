import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { authService } from '../services';
import {
  Calendar,
  Card,
  CloseModalButton,
  FlexRow,
  Image,
  Text
} from './elements';

const StyledImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const RoomDetail = (props) => {
  const { room, closeModal } = props;
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function setUser() {
      const user = await JSON.parse(authService.currentUserValue);
      if (user.user.roles.includes('ROLE_ADMIN')) setIsAdmin(true);
      setUserId(user.user.id);
    }
    setUser();
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
      <Text headlineSub="Location:">
        <strong>{`Town: `}</strong>
        <span>{`${room.town}\n`}</span>
        <strong>{`Street: `}</strong>
        <span>{room.street}</span>
        {room.floor && (
          <>
            <strong>{`\nFloor: `}</strong>
            <span>{`${room.floor}\n`}</span>{' '}
          </>
        )}
      </Text>

      {room.description && (
        <Text headlineSub="Description:" text={room.description} />
      )}
      {room && userId && (
        <FlexRow>
          <Calendar
            roomId={room._id}
            roomName={room.name}
            userId={userId}
            isAdmin={isAdmin}
          />
        </FlexRow>
      )}

      <CloseModalButton type="button" onClick={() => closeModal()}>
        X
      </CloseModalButton>
    </Card>
  );
};

export default RoomDetail;
