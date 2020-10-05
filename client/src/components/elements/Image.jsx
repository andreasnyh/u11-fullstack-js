import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imgUrl});
`;

export default Image;
