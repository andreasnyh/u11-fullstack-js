import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  padding: 15px;
  margin: 2em 0 2em;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`;

const Form = ({ handleSubmit, id, children, text }) => {
  return (
    <StyledForm onSubmit={handleSubmit} id={id}>
      <h2>{text}</h2>
      {children}
    </StyledForm>
  );
};

export default Form;
