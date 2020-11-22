import styled from 'styled-components';

import { Button } from '.';

const CloseModalButton = styled(Button)`
  position: absolute;
  top: 0;
  z-index: 11;
  right: 1rem;
  width: 2rem;
  padding: 5px;
`;

export default CloseModalButton;
