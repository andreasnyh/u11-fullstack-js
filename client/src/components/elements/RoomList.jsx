import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import { RoomDetail } from '..';
import { Button, Card, FlexRow, Image, Text } from '.';

const StyledImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const RoomListCard = styled(Card)`
  max-width: 500px;
`;

const RoomList = (props) => {
  const { room } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInfoClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalStyles = {
    content: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      padding: '0',
      border: 'none',
      margin: '0 auto',
      maxWidth: '710px',
      position: 'absolute',
      scrollbarWidth: 'thin',
      backgroundColor: 'transparent'
    },
    overlay: {
      zIndex: 999999999999
    }
  };

  return (
    <RoomListCard key={room._id}>
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
      <FlexRow>
        <Button
          type="button"
          style={{ width: '100%' }} // Temporary until implementation of button below
          onClick={() => {
            handleInfoClick();
          }}
        >
          More Info
        </Button>
        {/*
        <Button type="button" onClick={() => bookRoom(room._id)}>
          Book
        </Button>
         */}
      </FlexRow>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <RoomDetail room={room} closeModal={closeModal} />
      </Modal>
    </RoomListCard>
  );
};

export default RoomList;
