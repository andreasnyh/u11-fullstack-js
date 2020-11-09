import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';
import Card from './Card';

const CardFull = styled.div`
  bottom: 0;
  width: 100%;
  display: flex;
  margin: 0 auto;
  padding: 1em;
  position: ${(props) => (props.static ? 'static' : 'absolute')};
  align-items: center;
  color: ${Colors.Text};
  height: calc(100% - 21px);
  border-radius: 30px 30px 0 0;
  background-color: ${Colors.Dark};
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  ${Card}:last-child {
    margin-bottom: 4rem;
  }
`;

export default CardFull;
