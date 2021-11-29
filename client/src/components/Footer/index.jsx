import { Link as link } from "react-router-dom";
import styled from "styled-components";
import { Col, GridRow } from "../Containers";

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 4rem 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Content = styled(GridRow)`
  max-width: 1400px;
  width: 100%;
  align-items: flex-start;
`
const Link = styled(link)`
  text-decoration: none;
  color: white;
  font-size: .9rem;
  opacity: 0.8;
  margin-bottom: 6px;
  :hover{
    opacity: 1;
  }
`

export default function Footer() {
  return(
    <FooterContainer>
      <Content gap={"110px"}>
        <Col>
          <h2 style={{marginBottom: 6}}>What's <span style={{color: '#FFB800'}}>Cooking</span></h2>
          <p style={{fontSize: '.8rem', margin: 0}}>Cooking companion for the busy worker</p>
        </Col>
        <Col>
          <h4 style={{marginBottom: 12}}>Links</h4>
          <Link to="/meals">Meals</Link>
          <Link to="/signUp">Sign Up</Link>
          <Link to="/logIn">Log In</Link>
        </Col>

      </Content>
    </FooterContainer>
  );
}