import styled from "styled-components";
import { Col } from "../Containers";

const containerBase = styled.div`
  width: ${prop => prop.width || '250px'};
  height: ${prop => prop.height || '400px'};
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  `
export const CardPortalBase = styled(containerBase)`
  border: 2px dashed #C4C4C4;
  color: #999999;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const CardBase = styled(containerBase)`
  background-color: white;
  box-shadow: 0 0 15px rgba(0,0,0,.15);
  :hover {
    box-shadow: 0 0 12px rgba(0,0,0,.2);
  }
`;

const imageBase = styled.div`
  width: ${prop => prop.width || '100%'};
  height: ${prop => prop.height || '100%'};
  display: flex;
  flex: 1;
  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ImageDisplay = styled(imageBase)`
  background-image: ${prop => `url(${prop.src})`};
  background-size: cover;
  background-position: center;
`;

const ImagePlaceholder = styled(imageBase)`
  background-color: rgba(0,0,0,.2);
  color: rgba(0,0,0,.2);
  font-size: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const CardImage = (props) => (
  <>
    {props.src ? (
      <ImageDisplay src={props.src} onClick={props.onClick} />
    ) : (
      <ImagePlaceholder onClick={props.onClick}>
        <i className="fa-solid fa-burger" />
      </ImagePlaceholder>
    )}
  </>
)

export const CardContent = styled(Col)`
  padding: 12px;
  padding-top: 0;
  text-align: left;
`;

export const CardButtonRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${prop => prop.flexed ? '1fr' : 'auto'};
  column-gap: 6px;
`