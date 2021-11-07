import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from '../Containers';
import { Header, Container, Brand, Nav, NavigationLink, LogInButton, SignUpButton, ProfilePortal, LogOutButton } from './components';

const NavigationBar = (props) => {
  const [loggedUser, setLoggedUser] = useState()

  useEffect(() => {
    setLoggedUser(props.userData)
  }, [props.userData])

  useEffect(() => {
    async function fetchLoggedUserInfo() {
      const res = await axios.get('/api/session');
      // console.log(res);

      setLoggedUser(res.data)
    }
    fetchLoggedUserInfo()
  }, [])

  return (
    <Header>
      <Container>
        <Brand />

        <Nav>
          <NavigationLink text="Meals" to="/meals" />

          <Row vCenter style={{justifyContent: 'flex-end', flex: 1}}>
            {!loggedUser ? (<>
              <LogInButton />
              <SignUpButton />
            </>) : (<>
              <ProfilePortal img={loggedUser?.profileImage?.image} to={`/profile/${loggedUser._id}`}/>
              <LogOutButton onLogOut={() => setLoggedUser(null)} />
              </>)}
          </Row>
          
        </Nav>
      </Container>
    </Header>
)};

export default NavigationBar