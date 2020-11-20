import styled from 'styled-components';

import { Colors, Shadows } from '../../config/ColorsShadows';

const Card = styled.div`
  width: 100%;
  padding: 1em;
  max-width: 700px;
  text-align: left;
  position: relative;
  border-radius: 20px;
  margin: 1rem auto 2rem;
  color: ${Colors.lightText};
  box-shadow: ${Shadows.CardShadow};
  background-color: ${Colors.lightDark};
`;

export default Card;
