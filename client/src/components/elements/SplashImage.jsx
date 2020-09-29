import styled from 'styled-components';

const splashImage = styled.img`
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  background-position: top;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imgUrl});
`;

export default splashImage;
