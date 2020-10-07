import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';

const Input = styled.input`
  border: 0;
  width: 100%;
  outline: none;
  padding: 14px;
  margin: 10px 0;
  font-size: 0.9rem;
  border-radius: 20px;
  &&:focus {
    box-shadow: 0 0 2pt 2pt ${Colors.Important};
  }
`;

export default Input;
