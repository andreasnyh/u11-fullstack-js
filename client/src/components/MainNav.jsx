import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import { Colors } from '../config/ColorsShadows';
import { authService } from '../services';
import { Button, Card, CloseModalButton } from './elements';

const Menu = styled(Card)`
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  position: fixed;
  z-index: 99999999999;
  border-radius: 0 0 20px 20px;
  background-color: ${Colors.Important};
`;

const ToggleMenuButton = styled(Button)`
  margin: 0;
  width: auto;
  height: auto;
  color: black;
  font-size: 1.5rem;
  margin-left: auto;
  padding: 0.25rem 0.5rem;
`;

const MenuItemButton = styled(Button)`
  width: 100%;
`;

const MenuList = styled.ul`
  text-align: center;

  &:first-child {
    margin-top: 3rem;
  }

  li:nth-of-type(2n) {
    button {
      background-color: ${Colors.Important};
    }
  }
`;

const MenuItem = styled.li`
  list-style: none;
`;

const modalStyles = {
  content: {
    top: '0',
    left: '0',
    inset: '0',
    position: 'relative',
    borderRadius: '0 0 20px 20px',
    backgroundColor: Colors.lightDark
  },
  overlay: {
    zIndex: 999999999999
  }
};

const MainNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const logOut = () => {
    authService.logout();
  };

  return (
    currentUser && (
      <>
        <Modal style={modalStyles} isOpen={showMenu}>
          <MenuList>
            <MenuItem>
              {/* This navigation is outside the router that's why we use regular <a href> */}
              <a href="/home">
                <MenuItemButton type="button">Rooms</MenuItemButton>
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href={
                  currentUser.user.roles.includes('ROLE_ADMIN')
                    ? '/admin'
                    : '/user/dashboard'
                }
              >
                <MenuItemButton>Dashboard</MenuItemButton>
              </a>
            </MenuItem>
            <MenuItem>
              <MenuItemButton type="button" onClick={logOut}>
                Log Out
              </MenuItemButton>
            </MenuItem>
          </MenuList>
          <CloseModalButton onClick={() => setShowMenu(false)}>
            X
          </CloseModalButton>
        </Modal>

        <Menu>
          <ToggleMenuButton
            type="button"
            onClick={() => setShowMenu(!showMenu)}
          >
            ≡
          </ToggleMenuButton>
        </Menu>
      </>
    )
  );
};

export default MainNav;
