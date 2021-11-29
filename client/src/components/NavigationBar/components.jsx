import styled from 'styled-components';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import Image from '../ImageDisplays/';
import Button from '../Buttons';
import axios from 'axios';

/** Header base container component */ 
export const Header = styled.header`
  background-color: white;
  width: 100%;
  box-shadow: 0 0 12px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 18px;
  height: 60px;
  z-index: 2;
  position: relative;
`;

/** Header content container - restricts sizing of components within header 
 * - Add media query styling for navbar here */ 
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;  
  align-items: center;
  justify-content: space-between; 
  max-width: 1400px;
`;

/** Navigation links container - wrap navigation links here */ 
export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;


const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: rgba(0,0,0,.6);
  font-size: .9rem;
  margin-right: 12px;
  :hover{
    color: rgba(0,0,0,1)
  }
  :last-child {
    margin-right: 0;
  }
`;

/** Site brand - directs user to homepage on click */ 
export const Brand = () => (
  <Link to={'/'} style={{ marginRight: '36px', height: '30%' }}>
    <img src={Logo} alt="logo" style={{ height: '100%' }} />
  </Link>
);


export const NavigationLink = (props) => (
  <StyledNavLink to={props.to} activeClassName="linkActive">
    <p>{props.text}</p>
  </StyledNavLink>
);

export const LogInButton = () => (
  <Link style={{ marginLeft: '12px' }} to={'/login'}>
    <Button.Ghost rounded>Log In</Button.Ghost>
  </Link>
);

export const LogOutButton = (props) => {
  const history = useHistory();

  function handleLogOut() {
    axios.delete('/api/session')
      .then((res) => {
        props.onLogOut(res.data);
        history.push('/')
      })
    ;
  }

  return (
    <Button.Ghost 
      rounded 
      color={'black'}
      style={{marginLeft: '12px'}}
      onClick={handleLogOut}
    >
      Log Out
    </Button.Ghost>
)};

export const SignUpButton = () => (
  <Link style={{ marginLeft: '12px' }} to={'/signup'}>
    <Button.Primary rounded>Sign Up</Button.Primary>
  </Link>
);

export const ProfilePortal = (props) => (
  <Link to={props.to} style={{ marginLeft: '12px' }}>
    <Image.Profile src={props.img} size={'30px'} />
  </Link>
);
