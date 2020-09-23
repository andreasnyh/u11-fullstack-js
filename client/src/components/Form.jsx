import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  // margin: 120px auto 40px auto;
  padding: 15px;
  width: 100%;
  border-radius: 10px;
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
