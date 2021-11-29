import styled from "styled-components"
import profileIcon from '../../assets/profileIcon.svg'

const ImageContainer = styled.div`
  height: ${(props) => props.size || `50px`};
  width: ${(props) => props.size || `50px`};
  border-radius: 1000px;
  overflow: hidden;
  display: flex; 
  flex-direction: column;
  align-items: center;
`;

const NullPicBackground = styled.div`
  background-color: rgba(0,0,0,0.1);
  height: 100%;
  width: 100%;
`;

export default function ProfileImage(props) {
  return(
    <ImageContainer size={props.size} style={props.style}>
      {typeof props.src === 'undefined' ? (
        <NullPicBackground>
          <img src={profileIcon} alt="" style={{height: '100%', width: '100%'}}/>
        </NullPicBackground>
      ) : (
        <img src={props.src} alt="" style={{height: '100%'}}/>
      )}
    </ImageContainer>
  )
}