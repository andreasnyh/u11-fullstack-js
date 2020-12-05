import React from 'react';
import styled from 'styled-components';

import { Card } from '.';
// import { Colors } from '../../config/ColorsShadows';

const StyledWrapper = styled.div`
  margin: 1rem;
  text-align: left;
  white-space: pre-line;
`;

const Content = styled(Card)`
  margin: 0 !important;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2) inset;
  background-color: white;
`;

const StyledHeadline = styled.h2`
  font-weight: 700;
  text-align: center;
`;

const StyledHeadlineSub = styled.h3`
  margin: 1em 0 1em;
  font-weight: 600;
`;

const StyledText = styled.p``;

const Text = (props) => {
  const { headline, headlineSub, text, children } = props;
  return (
    <StyledWrapper>
      {headline && <StyledHeadline>{headline}</StyledHeadline>}
      {headlineSub && <StyledHeadlineSub>{headlineSub}</StyledHeadlineSub>}
      {text && (
        <Content>
          <StyledText>{text}</StyledText>
        </Content>
      )}
      {children && <Content>{children && children}</Content>}
    </StyledWrapper>
  );
};

export default Text;
