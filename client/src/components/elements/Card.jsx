import styled from 'styled-components';

import { Colors, Shadows } from '../../config/ColorsShadows';

const Card = styled.div`
  width: 100%;
  padding: 1em;
  margin: 0 auto;
  position: relative;
  border-radius: 20px;
  color: ${Colors.lightText};
  background-color: ${Colors.lightDark};
  box-shadow: ${Shadows.CardShadow};
`;

export default Card;
