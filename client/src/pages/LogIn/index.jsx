import {useState} from 'react'
import axios from 'axios'
import Input, {Label} from '../../components/Inputs';
import { Col, Container, Page, Row, Section } from '../../components/Containers';
import Button, { BackButton } from '../../components/Buttons';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const ErrorPrompt = styled.p`
  color: #ff5252;
  margin: 0;
  font-weight: bold;
  font-size: 0.8rem;
`

export default function LogIn(props) {
  const [form, setForm] =  useState({email: '', password: ''})
  const [error, setError] = useState('')
  const history = useHistory()

  function handleChange(e) {
    const {name, value} = e.currentTarget;
    setForm({...form, [name]: value})
  }

  async function handleSubmit() {
    setError('');
    // ? Submit login info
    const res = await axios.post('/api/session', form)
    // console.log(res)
    // ? If error string is returned, set it as state
    if (typeof res.data === 'string') {
      return setError(res.data);
    }
    // ? If login successful, redirect to relevant page
    props.onLoginSuccess(res.data)
    history.push(`/profile/${res.data._id}`)
  }

  return(
    <Page>
      <Section>
        <Container>

        {/* Page Header */}
        <Row vCenter style={{marginBottom: '18px'}}>
          <BackButton style={{marginRight: 12}}/>
          <h1>Log in</h1>
        </Row>

        {/* Login Form */}
        <Col style={{paddingLeft: '52px', alignItems: 'flex-start'}}>
        {/* Login Fields */}
          <Col style={{marginBottom: '24px'}}>
            <Label>Email</Label>
            <Input 
              name='email'
              onChange={handleChange}
              value={form.email}
              placeholder="email"
              style={{marginBottom: '12px', minWidth: '300px'}}
              type="email"
            />

            <Label>Password</Label>
            <Input 
              name='password'
              onChange={handleChange}
              value={form.password}
              placeholder="password"
              style={{minWidth: '300px'}}
              type="password"
            />
            {/* Error display */}
            {error && (
              <ErrorPrompt style={{marginTop: '12px'}}>{error}</ErrorPrompt>
            )}
          </Col>

          {/* Log in Button */}
          <Button.Primary 
            color="#FFB800"
            style={{width: '100px', fontSize: '1rem'}}
            onClick={handleSubmit}
          >
            Log in
          </Button.Primary>

        </Col>
        </Container>
      </Section>
    </Page>
  )
}