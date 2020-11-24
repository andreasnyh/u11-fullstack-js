import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Colors } from '../config/ColorsShadows';
import { /* authService, */ userService } from '../services';
import { AccessRestricted } from '.';
import { Card, Text } from './elements';

const UserCard = styled(Card)`
  max-width: 100%;
  overflow-x: auto;
`;

const UserTable = styled.table`
  text-align: left;
  margin: 2rem auto;
  border-collapse: collapse;
  width: 100%;

  > thead {
    > tr {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 1.5rem 0.5rem 1rem;
    }
    > th {
      padding: 0.25rem;
    }
  }
`;

const UserTableBody = styled.tbody`
  width: 100%;
  display: block;
  overflow: auto;
  margin-right: 1rem;
  background-color: ${Colors.lightLight};

  > tr {
    margin: 0.5rem 0;
    border: 1px solid black;

    &:nth-child(odd) {
      background-color: ${Colors.Dark};
    }

    > td {
      color: black;
      font-weight: 600;
      white-space: nowrap;
      padding: 0.5rem 1rem;

      /* &:last-child {
        padding: 0.5rem 0;
      } */
    }
  }
`;

const Users = (props) => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const { history } = props;

  useEffect(() => {
    userService
      .getAll()
      .then((allUsers) => setUsers(allUsers))
      .catch((e) => setError(e));
  }, []);

  if (error) {
    return error;
  }

  if (users !== null && users[0].status) {
    console.log(users[0]);
    return <AccessRestricted history={history} msg={users[0].msg} />;
  }

  return users ? (
    <UserCard>
      <Text headline="Users" />
      <UserTable>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <UserTableBody>
          {users.map((user) => {
            console.log(user);
            return (
              <tr key={user._id}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>
                  <span role="img" aria-label="">
                    🖋
                  </span>
                </td>
                <td>
                  <span role="img" aria-label="">
                    ❌
                  </span>
                </td>
              </tr>
            );
          })}
        </UserTableBody>
      </UserTable>
    </UserCard>
  ) : (
    <p>Loading</p>
  );
};

export default Users;
