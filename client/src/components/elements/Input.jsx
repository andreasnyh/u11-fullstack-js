import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';

const Input = styled.input`
  width: 100%;
  border: 0;
  margin: 10px 0;
  padding: 14px;
  outline: none;
  border-radius: 20px;
  &&:focus {
    box-shadow: 0 0 2pt 2pt ${Colors.Important};
  }
`;

export default Input;
