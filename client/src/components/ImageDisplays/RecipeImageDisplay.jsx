import styled from "styled-components";

const imageBase = styled.div`
  width: ${prop => prop.width || '400px'};
  height: ${prop => prop.height || '600px'};
  display: flex;
  flex: 1;
  border-radius: 12px;
  box-sizing: border-box;
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

export default function RecipeImageDisplay(props) {
  return (
  <>
    {props.src ? (
      <ImageDisplay src={props.src}/>
    ) : (
      <ImagePlaceholder onClick={props.onClick}>
        <i className="fa-solid fa-burger" />
      </ImagePlaceholder>
    )}
  </>
)}