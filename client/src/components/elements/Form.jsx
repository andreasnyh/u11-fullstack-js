import React from 'react';
import styled from 'styled-components';

// import { Colors, Shadows } from '../../config/ColorsShadows';

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
`;

const StyledH3 = styled.h3`
  align-self: flex-start;
  margin-left: 0.8em;
`;

const Form = ({ handleSubmit, id, children, text }) => {
  return (
    <StyledForm onSubmit={handleSubmit} id={id}>
      <StyledH3>{text}</StyledH3>
      {children}
    </StyledForm>
  );
};

export default Form;
