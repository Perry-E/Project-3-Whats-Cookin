import {useState} from 'react'
import axios from 'axios'
import validator from 'validator';
import {useHistory} from 'react-router-dom';

import { Col, Container, Page, Row, Section } from '../../components/Containers';
import ImageInput from '../../components/Inputs/ImageInput';
import Input, { Label } from '../../components/Inputs';
import Button, { BackButton } from '../../components/Buttons';
import ErrorPrompt from '../../components/ErrorPrompt';
import Modal from '../../components/Modals';
import styled from 'styled-components';

const Field = styled(Col)`
  margin-bottom: 18px;
`

export default function SignUp() {
  const [form, setForm] =  useState({name: '', email: '', password: '', rePassword: '', image: null});
  const [formErr, setFormErr] = useState({name: '', email: '', password: '', rePassword: ''});
  const [modalStatus, setModalStatus] = useState('');
  const history = useHistory();

  function handleChange(e) {
    const {name, value} = e.currentTarget;
    setForm({...form, [name]: value})
  }

  async function checkForm() {
    const errors = {};

    function checkName(name) {
      if (validator.isEmpty(name, {ignore_whitespace:true})) {
        errors.name ="Please fill in your name";
      }
    }

    function checkEmail(email) {
      if (validator.isEmpty(email, {ignore_whitespace:true})) {
        errors.email = "Please fill in your email"
      }
       else if (!validator.isEmail(email)) {
        errors.email ="Please enter a valid email address"
      }
    }
    
    function checkPassword(password) {
      if (!validator.isStrongPassword(password, {minSymbols: 0})) {
        errors.password = "Make sure your password contains at least 8 characters, 1 uppercase letter and 1 number"
      } 
    }

    function checkPasswordConfirmation(password, rePassword) {
      if (!errors.password && password !== rePassword) {
        errors.rePassword ="Make sure your passwords match"
      }
    }

    checkName(form.name);
    checkEmail(form.email);
    checkPassword(form.password);
    checkPasswordConfirmation(form.password, form.rePassword);

    if (errors.name || errors.password || errors.email || errors.rePassword) {
      setFormErr(errors)
    } else {
      handleSubmit()  
    }
  }

  async function handleSubmit() {
    const formData = new FormData();
    formData.append('image', form.image)
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('password', form.password)

    const res = await axios.post('/api/user', formData)
    if (typeof res.data === 'object') {
      setModalStatus('success')
    } else {
      setFormErr({...formErr, email: res.data})
    }
  }

  return(
    <>
    <Page>
      <Section>
        <Container>
          {/* Page Header */}
        <Row vCenter style={{marginBottom: '18px'}}>
          <BackButton style={{marginRight: 12}}/>
          <h1>Sign Up</h1>
        </Row>

          <Row style={{marginLeft: '52px'}}>
            <ImageInput
              onChange={(file) => setForm({...form, image: file})}
              style={{marginRight: '24px'}}
            />

            <Col style={{minWidth: '400px', flex: 1}}>
              <Field>
                <Label>Name</Label>
                <Input 
                  name='name'
                  onChange={handleChange}
                  value={form.name}
                  placeholder="name"
                  error={formErr.name}
                />
                {formErr.name && <ErrorPrompt>{formErr.name}</ErrorPrompt>}
              </Field>

              <Field>
                <Label>Email</Label>
                <Input
                  name='email'
                  onChange={handleChange}
                  value={form.email}
                  placeholder="email"
                  error={formErr.email}
                />
                {formErr.email && <ErrorPrompt>{formErr.email}</ErrorPrompt>}
              </Field>

              <Field>
                <Label>Password</Label>
                <Input 
                  name='password'
                  type="password"
                  onChange={handleChange}
                  value={form.password}
                  placeholder="password"
                  error={formErr.password}
                />
                {formErr.password && <ErrorPrompt>{formErr.password}</ErrorPrompt>}
                <Input 
                  name='rePassword'
                  type="password"
                  onChange={handleChange}
                  value={form.rePassword}
                  placeholder="confirm password"
                  error={formErr.rePassword}
                  style={{marginTop: '6px'}}
                />
                {formErr.rePassword && <ErrorPrompt>{formErr.rePassword}</ErrorPrompt>}
              </Field>

              <Button.Primary 
                color="#FFB800"
                style={{width: '100px', fontSize: '1rem', marginLeft: 'auto'}}
                onClick={checkForm}
              >
                Sign Up
              </Button.Primary>
            </Col>
          </Row>
        </Container>
      </Section>
    </Page>

    {modalStatus === 'success' && (
      <Modal>
        <h3 style={{margin: 0, marginBottom: '6px'}}>Registration Successful!</h3>
        <p style={{margin: 0, marginBottom: '18px', color: 'rgba(0,0,0,.6)'}}>Login to start using your account</p>
        <Button.Primary 
          color="#FFB800"
          style={{width: '100%'}}
          rounded
          onClick={() => history.push('/')}
        >
          Okay!
        </Button.Primary>
      </Modal>
    )}
    </>
  )
}