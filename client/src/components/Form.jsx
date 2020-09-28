import React from 'react';
import styled from 'styled-components';

import { Colors, Shadows } from '../config/ColorsShadows';

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  padding: 15px;
  margin: 2em 0 2em;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  color: ${Colors.lightText};
  background-color: ${Colors.lightDark};
  box-shadow: ${Shadows.CardShadow};
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
