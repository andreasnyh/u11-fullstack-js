import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';

const Select = styled.select`
  width: 100%;
  border: 0;
  padding: 14px;
  outline: none;
  margin: 10px 0;
  font-size: 0.9rem;
  border-radius: 20px;
  background-color: white;
  &&:focus {
    box-shadow: 0 0 2pt 2pt ${Colors.Important};
  }
`;

export default Select;
