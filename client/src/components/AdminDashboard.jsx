import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Card, CardFull, Text } from './elements';

const DashButton = styled(Button)`
  width: 8rem;
  height: 8rem;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 3rem;
  margin: 4rem 0;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
`;

const AdminDashboard = () => {
  return (
    <CardFull>
      <Card>
        <Text headline="AdminDashboard" />
        <Grid>
          <Link to="admin/users">
            <DashButton>Users</DashButton>
          </Link>
          <Link to="admin/rooms">
            <DashButton>Rooms</DashButton>
          </Link>
          <Link to="admin/addroom">
            <DashButton>Add Room</DashButton>
          </Link>
        </Grid>
      </Card>
    </CardFull>
  );
};

export default AdminDashboard;
