import React from 'react';
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
          <DashButton>Users</DashButton>
          <DashButton>Rooms</DashButton>
          <DashButton>Add Room</DashButton>
        </Grid>
      </Card>
    </CardFull>
  );
};

export default AdminDashboard;
