import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  border: 0;
  width: 45%;
  margin: 1em 0;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 1em;
  transition: all 0.25s;
  color: ${Colors.Text};
  background: ${(props) => (props.confirm ? Colors.Important : Colors.Light)};
  outline: none;
  &&:focus {
    box-shadow: 0 0 2pt 2pt
      ${(props) => (props.confirm ? Colors.Light : Colors.Important)};
  }
  &&:hover {
    transform: scale(1.1);
    // background: ${Colors.White};
    // color: ${Colors.Black};
  }
`;

export default Button;
