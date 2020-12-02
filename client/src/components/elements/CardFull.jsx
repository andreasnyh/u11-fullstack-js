import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';
import Card from './Card';

const CardFull = styled.div`
  bottom: 0;
  /* top: 4.4rem; */
  width: 100%;
  padding: 1em;
  display: flex;
  margin: 0 auto;
  max-width: 700px;
  align-items: center;
  color: ${Colors.Text};
  height: calc(100% - 21px);
  min-height: calc(100vh - 4rem);
  border-radius: 30px 30px 0 0;
  background-color: ${Colors.Dark};
  margin-top: ${(props) => (props.static ? '4rem' : '0')};
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  position: ${(props) => (props.static ? 'static' : 'absolute')};

  ${Card}:last-child {
    margin-bottom: 4rem;
  }
`;

export default CardFull;
