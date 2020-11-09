import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';

const Textarea = styled.textarea`
  width: 100%;
  border: 0;
  margin: 10px 0;
  padding: 14px;
  outline: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-family: inherit;
  &&:focus {
    box-shadow: 0 0 2pt 2pt ${Colors.Important};
  }
`;

export default Textarea;
