import styled from 'styled-components';

import { Button } from '.';

const CloseModalButton = styled(Button)`
  position: absolute;
  top: 0;
  z-index: 11;
  right: 1rem;
  width: 40px;
  height: 40px;
  padding: 8px 4px;
`;

export default CloseModalButton;
