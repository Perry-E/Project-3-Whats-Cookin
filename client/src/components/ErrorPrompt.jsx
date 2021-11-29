import styled from "styled-components"

const PromptContainer = styled.div`
  color: rgb(255, 82, 82);
  background-color: rgba(255, 82, 82, .2);
  padding: 3px 6px;
  border-radius: 3px;
  margin: 0;
  margin-top: 6px;
  /* font-weight: bold; */
  font-size: 0.8rem;
`;

export default function ErrorPrompt(props) {
  return(
    <PromptContainer>
      {!props.hideIcon && <i className="fa-solid fa-xmark" style={{marginRight: '6px'}} />}
      <span>{props.children}</span>
    </PromptContainer>
  )
}