import React, { useState } from "react";
// importing axios 
import axios from 'axios';
// importing bootstrap

import { Link } from "react-router-dom";


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios.post('https://shrouded-beach-69227.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      /* then call props.onLoggedIn(username) */
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <Container className='container'>
      <Form>
        <Form.Group className='login'>
          <h4>Do You Have an Account ?</h4>
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
              <Form.Label className='Label'>Password:</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='control'
                type='password'
                placeholder='Enter Password'
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col className='Button'>
              <Button type='button' variant='dark' onClick={handleSubmit}>
                Login
              </Button>
            </Col>
            <Col className='Button'>
              <Link to={`/register`}>
                <Button type='button' variant="danger">Register</Button>
              </Link>
            </Col>
          </Row>
        </Form.Group>

      </Form>
    </Container>
  );
}
