//importing react 
import React, { useState } from 'react';

import axios from 'axios';

//importingbootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//importing scss file
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');


  // login credentials
  const handleSubmit = (e) => {

    axios.post('https://shrouded-beach-69227.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <Container className='container'>
      <Form>
        <Form.Group className='registration'>
          <br />
          <br />
          <h4>Please Register</h4>
          <Row>
            <Col>
              <Form.Label className='Label'>Username:</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='Control'
                type='text'
                placeholder='Enter Username'
              />
            </Col>
            <Col>
              <Form.Label className='Label'>Email:</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='email'
                type='email'
                placeholder='Enter Email'
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className='Label'>Birthday:</Form.Label>
              <Form.Control
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className='birthday'
                type='date'
                placeholder='Enter Birthday'
              />
            </Col>
            <Col>
              <Form.Label className='Label'>Password:</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='Control2'
                type='password'
                placeholder='Enter Password'
              />
            </Col>
          </Row>
          <br />
          <Row className='Button'>
            <Col>
              <Button type='button' variant='dark' onClick={handleSubmit}>
                Register
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
}