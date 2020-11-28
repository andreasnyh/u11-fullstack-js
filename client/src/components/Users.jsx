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
      > th {
        padding: 0.25rem 1rem;
      }
    }
  }
`;

const UserTableBody = styled.tbody`
  /* display: block; */
  overflow: auto;
  /* width: max-content; */
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

const ModalForm = styled(Form)`
  margin: 10rem 0;
  color: red !important;
`;

const Users = (props) => {
  const [users, setUsers] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [newFirstName, setNewFirstName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { history } = props;

  const fetchUsers = async () => {
    userService
      .getAll()
      .then((allUsers) => setUsers(allUsers))
      .catch((e) => setError(e));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const closeModal = async () => {
    setShowModal(false);
    setEditUser(null);
    setNewFirstName(null);
    setNewLastName(null);
    setNewEmail(null);
  };

  if (error) {
    return error;
  }

  if (users !== null && users[0].status) {
    console.log(users[0]);
    return <AccessRestricted history={history} msg={users[0].msg} />;
  }

  const selectUser = (id) => {
    userService
      .findById(id)
      .then((res) => {
        setEditUser(res);
        setNewFirstName(res.firstName);
        setNewLastName(res.lastName);
        setNewEmail(res.email);
      })
      .then(() => setShowModal(true));
  };

  const updateUser = (event) => {
    event.preventDefault();
    const user = {};
    const id = editUser._id;
    if (editUser.firstName !== newFirstName) {
      user.firstName = newFirstName;
    }
    if (editUser.lastName !== newLastName) {
      user.lastName = newLastName;
    }
    if (editUser.email !== newEmail) {
      user.email = newEmail;
    }

    if (!user.firstName && !user.lastName && !user.email) {
      return console.log('No changes');
    }

    return userService.update(id, user).then(() => {
      closeModal().then(() =>
        userService
          .getAll()
          .then((allUsers) => setUsers(allUsers))
          .catch((e) => setError(e))
      );
    });
  };

  const deleteUser = (user) => {
    // eslint-disable-next-line no-restricted-globals
    const del = confirm(
      `Are you sure you want to delete user: ${user.firstName} ${user.lastName}?`
    );

    if (del) {
      userService.deleteUser(user._id).then(() => {
        fetchUsers();
      });
    }
  };

  const modalStyles = {
    content: {
      top: '5rem',
      right: '0',
      bottom: '0',
      left: '0',
      padding: '0',
      border: 'none',
      margin: '0 0.5rem',
      maxWidth: '710px',
      position: 'absolute',
      scrollbarWidth: 'thin',
      backgroundColor: 'transparent'
    },
    overlay: {
      zIndex: 9999999999 // fix table scrollbar showing over modal
    }
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
              <th>Edit</th>
              <th>Delete</th>
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
                    <EditButton onClick={() => deleteUser(user)}>
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
          style={modalStyles}
          contentLabel="Edit User"
        >
          <Card>
            <span>Editing user: </span>
            <h2>{`${editUser.firstName} ${editUser.lastName}`}</h2>

            <ModalForm handleSubmit={updateUser}>
              <Label>
                First Name
                <Input
                  name="firstName"
                  type="text"
                  value={newFirstName}
                  onChange={(event) => setNewFirstName(event.target.value)}
                />
              </Label>
              <Label>
                Last Name
                <Input
                  name="lastName"
                  type="text"
                  value={newLastName}
                  onChange={(event) => setNewLastName(event.target.value)}
                />
              </Label>
              <Label>
                Email
                <Input
                  name="email"
                  type="text"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                />
              </Label>
              <Button type="submit">Submit</Button>
            </ModalForm>
            <CloseModalButton
              type="button"
              onClick={() => {
                closeModal();
              }}
            >
              X
            </CloseModalButton>
          </Card>
        </Modal>
      )}
    </CardFull>
  ) : (
    <p>Loading</p>
  );
};

export default Users;
