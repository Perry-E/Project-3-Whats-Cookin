import styled from "styled-components"
import Button from "../../components/Buttons"

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translate(-100%, -50%);
  opacity: .2;
  cursor: pointer;
  :hover {
    opacity: .8;
  }
`

export const DeleteButton = (props) => (
  <DeleteButtonContainer onClick={props.onClick}>
    <i className="fa-solid fa-trash-can" />
  </DeleteButtonContainer>
)

const StyledButton = styled(Button.Ghost)`
  padding: 3px 6px;
  border-radius: 6px;
  font-size: 0.7rem;
  opacity: 0.5;
  :hover{
    opacity: 1;
  }
`

export const StepDeleteButton = (props) => (
  <StyledButton color={"#999999"} onClick={props.onClick}>
    <i className="fa-solid fa-trash-can" /> delete
  </StyledButton>
)