import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  border: 0;
  width: 50%;
  margin: 1em;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.75em 2em;
  transition: all 0.25s;
  color: ${Colors.Text};
  background: ${(props) => (props.confirm ? Colors.Important : Colors.Light)};
  &&:hover {
    transform: scale(1.1);
    // background: ${Colors.White};
    // color: ${Colors.Black};
  }
`;

export default Button;
