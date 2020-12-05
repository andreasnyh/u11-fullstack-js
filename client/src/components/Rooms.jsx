import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Form, Input, Label, RoomList, Text } from './elements';

const bookRoom = (id) => {
  console.log(id);
};

const SearchLabel = styled(Label)`
  text-align: left;
  margin-bottom: 0;
  margin-left: 3rem;
  font-weight: 700;
`;

const Rooms = (props) => {
  const { rooms } = props;
  const [query, setQuery] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(null);

  // Filter users
  useEffect(() => {
    if (!rooms) return;
    if (!query) setFilteredRooms(rooms);
    const regexp = new RegExp(query.toLowerCase(), 'g');
    const oldRooms = rooms.map((room) => room);

    const roomSize = Number(query);

    const newRooms = oldRooms.filter((room) => {
      return room.name.toLowerCase().match(regexp) ||
        room.town.toLowerCase().match(regexp) ||
        room.street.toLowerCase().match(regexp) ||
        (roomSize >= room.size.from && roomSize <= room.size.to)
        ? room
        : null;
    });
    setFilteredRooms(newRooms);
  }, [query, rooms]);

  return (
    <>
      <Form handleSubmit={(event) => event.preventDefault()}>
        <SearchLabel style={{ maxWidth: '500px' }}>Filter Rooms</SearchLabel>
        <Input
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          style={{ maxWidth: '500px' }}
        />
      </Form>

      {filteredRooms && filteredRooms.length === 0 && (
        <Text headlineSub="No rooms matching search" />
      )}
      {filteredRooms &&
        filteredRooms.map((room) => {
          return (
            <RoomList
              key={room._id}
              room={room}
              // moreInfo={moreInfo}
              bookRoom={bookRoom}
            />
          );
        })}
    </>
  );
};

export default Rooms;
