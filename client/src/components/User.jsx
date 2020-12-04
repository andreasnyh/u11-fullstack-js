import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import { authService, userService } from '../services';
import {
  Button,
  Card,
  CardFull,
  CloseModalButton,
  FlexRow,
  Form,
  Input,
  Label,
  Text
} from './elements';

const UserCard = styled(Card)`
  max-width: 100%;
  overflow-x: auto;
`;

const ButtonLabel = styled(Label)`
  width: unset;
`;

const EditButton = styled(Button)`
  margin: 0 1rem;
  padding: 0;
  height: 2rem;
  width: 2rem;
  &:hover {
    border: 1px solid black;
  }
`;

const EditButtonContainer = styled(FlexRow)`
  justify-content: space-evenly;
  text-align: center;
`;

const ModalForm = styled(Form)`
  margin: 10rem 0;
  color: red !important;
`;

const User = (props) => {
  const { currentUser, history } = props;
  const jsonUser = JSON.parse(currentUser);

  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [newFirstName, setNewFirstName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUser = async (id) => {
    userService
      .findById(id)
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch((e) => setError(e));
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !jsonUser.user ? null : fetchUser(jsonUser.user.id);
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

  const selectUser = (id) => {
    userService
      .findById(id)
      .then((res) => {
        setEditUser(res);
        setNewFirstName(res.firstName);
        setNewLastName(res.lastName);
        setNewEmail(res.email);
      })
      .then(() => setShowModal(true))
      .catch((e) => console.error(e));
  };

  const updateUser = (event) => {
    event.preventDefault();
    const newUserData = {};
    const id = editUser._id;
    if (editUser.firstName !== newFirstName) {
      newUserData.firstName = newFirstName;
    }
    if (editUser.lastName !== newLastName) {
      newUserData.lastName = newLastName;
    }
    if (editUser.email !== newEmail) {
      newUserData.email = newEmail;
    }

    if (!newUserData.firstName && !newUserData.lastName && !newUserData.email) {
      return console.log('No changes');
    }

    return userService.updateOne(id, newUserData).then(() => {
      closeModal().then(() =>
        userService
          .findById(id)
          .then((found) => setUser(found))
          .catch((e) => setError(e))
      );
    });
  };

  const deleteUser = (account) => {
    /* eslint-disable no-restricted-globals, no-alert */
    const del = confirm(
      `Are you sure you want to delete your account: ${account.firstName} ${account.lastName}?`
    );
    /* eslint-enable no-restricted-globals, no-alert */
    if (del) {
      userService.deleteUser(account._id).then(() => {
        authService.logout().then(() => history.push('/'));
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
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '710px',
      position: 'absolute',
      scrollbarWidth: 'thin',
      backgroundColor: 'transparent'
    },
    overlay: {
      zIndex: 9999999999 // fix table scrollbar showing over modal
    }
  };

  return user ? (
    <CardFull static>
      <Text headline={`${user.firstName} ${user.lastName}`} />
      <UserCard>
        <Label>
          First Name
          <Text headlineSub={user.firstName} />
        </Label>
        <Label>
          Last Name
          <Text headlineSub={user.lastName} />
        </Label>
        <Label>
          Email
          <Text headlineSub={user.email} />
        </Label>
        <EditButtonContainer>
          <ButtonLabel>
            Edit
            <EditButton confirm onClick={() => selectUser(user._id)}>
              <span role="img" aria-label="">
                🖋
              </span>
            </EditButton>
          </ButtonLabel>
          <ButtonLabel>
            Delete
            <EditButton onClick={() => deleteUser(user)}>
              <span role="img" aria-label="">
                ❌
              </span>
            </EditButton>
          </ButtonLabel>
        </EditButtonContainer>
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

export default User;
