import styled from 'styled-components';

import { Colors, Shadows } from '../../config/ColorsShadows';

const Card = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 1em;
  border-radius: 20px;
  color: ${Colors.lightText};
  background-color: ${Colors.lightDark};
  box-shadow: ${Shadows.CardShadow};
`;

export default Card;
