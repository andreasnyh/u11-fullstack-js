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

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isAdmin = currentUser.user.roles.includes('ROLE_ADMIN');

  return (
    currentUser && (
      <DashContainer>
        {isAdmin ? (
          <>
            <Text headline="Admin Dashboard" />
            <Card>
              <Text headlineSub="Users" />
              <Grid>
                <StyledLink to="admin/users">
                  <DashButton>Users</DashButton>
                </StyledLink>
                <StyledLink to="/signup">
                  <DashButton>Add User</DashButton>
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
          </>
        ) : (
          <>
            <Text headline="User Dashboard" />
            <Card>
              <Text
                headlineSub={`${currentUser.user.firstName} ${currentUser.user.lastName}`}
              />
              <Grid>
                <StyledLink to="/user/account">
                  <DashButton>My Account</DashButton>
                </StyledLink>
                {/* <StyledLink to="/signup">
                <DashButton>Add User</DashButton>
              </StyledLink> */}
              </Grid>
            </Card>
            {/* <Card>
            <Text headlineSub="Rooms" />
            <Grid>
              <StyledLink to="admin/rooms">
                <DashButton>Rooms</DashButton>
              </StyledLink>
              <StyledLink to="admin/addroom">
                <DashButton>Add Room</DashButton>
              </StyledLink>
            </Grid>
          </Card> */}
          </>
        )}
      </DashContainer>
    )
  );
};

export default Dashboard;
