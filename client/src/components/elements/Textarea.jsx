import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';

const Textarea = styled.textarea`
  border: 0;
  width: 100%;
  padding: 14px;
  outline: none;
  margin: 10px 0;
  max-width: 100%;
  min-width: 100%;
  min-height: 3rem;
  font-size: 0.9rem;
  border-radius: 20px;
  font-family: inherit;
  &&:focus {
    box-shadow: 0 0 2pt 2pt ${Colors.Important};
  }
`;

export default Textarea;
