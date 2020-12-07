import styled from 'styled-components';

import { Button } from '.';

const CloseModalButton = styled(Button)`
  top: 0;
  right: 1rem;
  width: 40px;
  z-index: 11;
  height: 40px;
  padding: 8px 4px;
  position: absolute;
`;

export default CloseModalButton;
