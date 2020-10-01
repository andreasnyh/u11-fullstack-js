import React from 'react';
import styled from 'styled-components';

// import { Colors } from '../../config/ColorsShadows';

const StyledWrapper = styled.div`
  margin: 1rem;
  text-align: left;
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
  const { headline, headlineSub, text } = props;
  return (
    <StyledWrapper>
      {headline ? <StyledHeadline>{headline}</StyledHeadline> : ''}
      {headlineSub ? <StyledHeadlineSub>{headlineSub}</StyledHeadlineSub> : ''}
      {text ? <StyledText>{text}</StyledText> : ''}
    </StyledWrapper>
  );
};

export default Text;
