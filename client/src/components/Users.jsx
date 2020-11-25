import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import { Colors } from '../config/ColorsShadows';
import { /* authService, */ userService } from '../services';
import { AccessRestricted } from '.';
import {
  Button,
  Card,
  CardFull,
  CloseModalButton,
  Form,
  Input,
  Label,
  Text
} from './elements';

const UserCard = styled(Card)`
  max-width: 100%;
  overflow-x: auto;
`;

const EditButton = styled(Button)`
  margin: 0;
  padding: 0;
  height: 2rem;
  width: 2rem;
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
    }
  }
`;

const Users = (props) => {
  const [users, setUsers] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const selectUser = (id) => {
    console.log(id);
    userService
      .findById(id)
      .then((res) => {
        console.log(res);
        setEditUser(res);
      })
      .then(() => setShowModal(true));
  };

  const submitEditUser = () => {
    console.log('edit sent');
  };

  return users ? (
    <CardFull>
      <Text headline="Users" />
      <UserCard>
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
              return (
                <tr key={user._id}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>
                    <EditButton onClick={() => selectUser(user._id)}>
                      <span role="img" aria-label="">
                        🖋
                      </span>
                    </EditButton>
                  </td>
                  <td>
                    <EditButton>
                      <span role="img" aria-label="">
                        ❌
                      </span>
                    </EditButton>
                  </td>
                </tr>
              );
            })}
          </UserTableBody>
        </UserTable>
      </UserCard>
      {/* Edit User modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          // onAfterOpen={this.afterOpenModal}
          // onRequestClose={this.closeModal}
          // style={customStyles}
          contentLabel="Edit User"
        >
          <h2>{`${editUser.firstName} ${editUser.lastName}`}</h2>

          <Form handleSubmit={submitEditUser}>
            <Label>
              First name
              <Input
                name="firstName"
                type="text"
                value={editUser.firstName}
                // onChange={handleChange}
              />
            </Label>
            <Label>
              Title
              <Input
                required
                type="text"
                name="title"
                // value={title || ''}
                placeholder="Event title"
                // onChange={this.handleChange}
              />
              <Label>
                Start Time
                <Input
                  name="startTime"
                  type="time"
                  // value={startTime || moment(date).format('HH:mm')}
                  // disabled={allDay}
                  // onChange={this.handleChange}
                />
              </Label>
              <Label>
                End Time
                <Input
                  name="endTime"
                  type="time"
                  // value={endTime || moment(date).format('HH:mm')}
                  // disabled={allDay}
                  // onChange={this.handleChange}
                />
              </Label>
            </Label>
            <button type="submit">submit</button>
          </Form>
          <CloseModalButton
            type="button"
            onClick={() => {
              setShowModal(false);
              setEditUser(null);
            }}
          >
            X
          </CloseModalButton>
        </Modal>
      )}
    </CardFull>
  ) : (
    <p>Loading</p>
  );
};

export default Users;
