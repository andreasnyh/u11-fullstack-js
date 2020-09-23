import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  border: 0;
  margin: 10px 0;
  padding: 14px;
  outline: none;
  border-radius: 20px;
  &&:focus {
    box-shadow: 0 0 3pt 2pt red;
  }
`;

export default Input;
