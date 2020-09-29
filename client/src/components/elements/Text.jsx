import React from 'react';
import styled from 'styled-components';

import { Colors } from '../../config/ColorsShadows';

const StyledText = styled.div`
  width: 100%;
  padding: 2em;
  margin: 0 auto;
  color: ${Colors.Text};
  background-color: ${Colors.Dark};
  border-radius: 30px 30px 0 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Text = (props) => {
  const { headline } = props;
  return (
    <StyledText>
      <h2>{headline}</h2>
    </StyledText>
  );
};

export default Text;
