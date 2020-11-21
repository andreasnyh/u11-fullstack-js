/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import { RoomDetail } from '..';
// import { Colors } from '../../config/ColorsShadows';
import { Button, Card, FlexRow, Image, Text } from '.';

const StyledImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const CloseModalButton = styled(Button)`
  position: absolute;
  top: 2rem;
  z-index: 11;
  right: 2rem;
  width: 2rem;
  padding: 5px;
`;

const RoomList = (props) => {
  const { room, bookRoom } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInfoClick = (id) => {
    setModalIsOpen(true);
    console.log(id);
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
      border: 'none',
      // // marginRight: '-50%',
      // // backgroundColor: `${Colors.Light}`,
      backgroundColor: 'transparent',
      // transform: 'translate(-50%, -50%)',
      // zIndex: 10,
      // width: '50rem',
      // maxWidth: 'calc(100vw - 2rem)',
      // maxHeight: 'calc(100vh - 2rem)',
      // overflowY: 'auto',
      position: 'absolute'
    },
    overlay: {
      zIndex: 10
    }
  };

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
            // moreInfo(room._id);
            handleInfoClick(room._id);
          }}
        >
          More Info
        </Button>
        <Button type="button" onClick={() => bookRoom(room._id)}>
          Book
        </Button>
      </FlexRow>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <CloseModalButton type="button" onClick={() => closeModal()}>
          X
        </CloseModalButton>
        <RoomDetail room={room} />
      </Modal>
    </Card>
  );
};

export default RoomList;
