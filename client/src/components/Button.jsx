import styled from 'styled-components';

import { Colors } from '../config/ColorsShadows';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.lightMode ? Colors.Pink : Colors.Pink)};
  color: ${(props) => (props.lightMode ? Colors.White : Colors.White)};
  font-size: 1rem;
  width: 50%;
  margin: 1em;
  padding: 0.75em 2em;
  border: 0;
  border-radius: 8px;
  transition: all 0.25s;
  &&:hover {
    transform: scale(1.1);
    // background: ${Colors.White};
    // color: ${Colors.Black};
  }
`;

export default Button;
