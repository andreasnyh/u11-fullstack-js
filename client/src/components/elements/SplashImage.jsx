import styled from 'styled-components';

const splashImage = styled.img`
  top: 0;
  left: 0;
  z-index: 1;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  transform: scale(1.01);
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imgUrl});
`;

export default splashImage;
