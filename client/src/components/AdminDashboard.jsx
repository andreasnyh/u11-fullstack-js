import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Card, CardFull, Text } from './elements';

const DashButton = styled(Button)`
  margin: 0;
  width: 100%;
`;

const DashContainer = styled(CardFull)`
  top: 4rem;
  height: fit-content;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 3rem;
  margin: 2rem 0;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
`;

const StyledLink = styled(Link)`
  width: 100%;
`;

const AdminDashboard = () => {
  return (
    <DashContainer>
      <Text headline="AdminDashboard" />
      <Card>
        <Text headlineSub="Users" />
        <Grid>
          <StyledLink to="admin/users">
            <DashButton>Users</DashButton>
          </StyledLink>
          <StyledLink to="admin/">
            <DashButton disabled>Add User*</DashButton>
          </StyledLink>
        </Grid>
      </Card>
      <Card>
        <Text headlineSub="Rooms" />
        <Grid>
          <StyledLink to="admin/rooms">
            <DashButton>Rooms</DashButton>
          </StyledLink>
          <StyledLink to="admin/addroom">
            <DashButton>Add Room</DashButton>
          </StyledLink>
        </Grid>
      </Card>
    </DashContainer>
  );
};

export default AdminDashboard;
