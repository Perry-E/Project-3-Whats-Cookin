import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from ".";
import Button from "../Buttons";
import { GridRow } from "../Containers";

export default function LoginRequiredModal(props) {
  const history = useHistory()

  // * Components * //
  const Header = styled.h3`
    margin: 0;
    margin-bottom: 6px;
  `

  const Text = styled.p`
    margin: 0;
    margin-bottom: 18px;
    font-size: .8rem;
  `

  const CloseButton = () => (
    <Button.Ghost 
      color="black" 
      onClick={() => props.closeModal()}
      rounded
    >
      Back
    </Button.Ghost>
  )

  const LogInButton = () => (
    <Button.Primary 
      color="#FFCB14" 
      onClick={() => history.push('/login')}
      rounded
    >
      Log In
    </Button.Primary>
  )

  // * Main Render * //
  return(
    <Modal>
      <Header>Login Required</Header>
      <Text>Don't have an account yet? Create one <Link to="/signup">here</Link></Text>
      <GridRow flexed>
        <CloseButton />
        <LogInButton />
      </GridRow>
    </Modal>
  )
}