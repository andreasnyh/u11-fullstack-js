import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';

const CardFull = styled.div`
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  padding: 2em 1em;
  position: absolute;
  height: calc(100% - 21px);
  color: ${Colors.Text};
  background-color: ${Colors.Dark};
  border-radius: 30px 30px 0 0;
`;

export default CardFull;
