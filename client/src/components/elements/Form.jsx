import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  padding: 15px;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
`;

const StyledH3 = styled.h3`
  margin-left: 0.8em;
  align-self: flex-start;
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
