import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const size = {height: 300, width: 300, borderRadius: 300 / 2}

const displayBase = styled.div`
  height: ${(prop) =>  prop.height || prop.size || `${size.height}px`};
  width: ${(prop) =>  prop.width || prop.size || `${size.height}px`};
  border-radius: ${(prop) => prop.borderRadius || `${size.borderRadius}px`};
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
`

const NullDisplay = styled(displayBase)`
  padding: 2rem;
  border: 2px dashed #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999999;
`;

const PreviewContainer = styled(displayBase)`
  position: relative;
  pointer-events: auto;
`

const PreviewDisplay = styled.div`
  height: 100%;
  width: 100%;
  background-image: ${prop => `url(${prop.preview})`};
  background-size: cover;
  background-position: center;
`;

const HoverDisplay = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: rgba(0,0,0,0.4);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  position: absolute; 
  z-index: 2;
  opacity: 0;
  :hover{
    opacity: 1;
  };
`;

export default function ImageInput(props) {
  const [image, setImage] = useState({file: null, preview: null})
  const inputRef = useRef()

  useEffect(() => {
    if (typeof props.value === 'string') {
      setImage({...image, preview: props.value})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  function handleClick() {
    inputRef.current.click()
  }

  function handleChange(e) {
    if(e.target.files.length !== 0){
      const selectedFile = e.target.files[0];
      setImage({...image, preview: URL.createObjectURL(selectedFile)});

      props.onChange(selectedFile)
    }
  }

  return(
    <div style={props.style}>
      {!image.preview ? (
        <NullDisplay onClick={handleClick} size={props.size} height={props.height} width={props.width} borderRadius={props.borderRadius}>
          {props.placeHolder || (
            <>
              <i className="fa-solid fa-plus" style={{fontSize: '2rem'}} />
              <h4 style={{margin: 0, marginTop: '12px'}}>{props.label || "Upload a image"}</h4>
            </>
          )}
        </NullDisplay>
      ) : (
        <PreviewContainer onClick={handleClick} size={props.size} height={props.height} width={props.width} borderRadius={props.borderRadius}>
          <HoverDisplay>
            <i className="fa-solid fa-pen-to-square" style={{fontSize: "2rem"}} />
          </HoverDisplay>
          <PreviewDisplay preview={image.preview}/>
        </PreviewContainer>
      )}
      <input 
        style={{display: 'none'}} 
        type="file"
        name={props.name || "image"} 
        onChange={handleChange} 
        ref={inputRef}
      />
    </div>
  )
}