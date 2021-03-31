import React, { useState } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";


export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
      email: null,
      password: null,
      birthday: null
    };

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setBirthday = this.setBirthday.bind(this);
    this.setEmail = this.setEmail.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem('token');
    var user = localStorage.getItem('user');

    let url = 'https://shrouded-beach-69227.herokuapp.com/users/' + String(user);
    axios({
      method: 'get', url: url,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const data = response.data;
        console.log(data.Username);
        this.setState({
          user: data.Username,
          email: data.Email,
          birthday: data.Birthday.substr(0, 10),
        });
      })
      .catch(e => {
        console.log('error getting the user', e, url)
      });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  setUsername(event) {
    this.setState({ user: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  setBirthday(event) {
    this.setState({ birthday: event.target.value });
  }

  render() {

    const handleUpdate = (e) => {

      var token = localStorage.getItem('token');
      let url = 'https://shrouded-beach-69227.herokuapp.com/users/' + String(this.state.user);
      axios({
        method: 'put', url: url,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          "Username": this.state.user,
          "Password": this.state.password,
          "Email": this.state.email,
          "Birthday": this.state.birthday
        }
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = "/";
        })
        .catch(e => {
          console.log('error updating the user', e, url)
        });
    };

    const handleDeregister = (e) => {

      var token = localStorage.getItem('token');
      var user = localStorage.getItem('user');
      let url = 'https://shrouded-beach-69227.herokuapp.com/users/' + String(user);
      axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = "/";

        })
        .catch(e => {
          console.log('error deregistering the user', e, url)
        });
    };

    return (
      <Container className='container'>
        <h1>hello {this.state.user}</h1>
        <Form>
          <Form.Group className='registration'>
            <br />
            <br />
            <h4>Update User Info</h4>
            <Row>
              <Col>
                <Form.Label className='Label'>New Username:</Form.Label>
                <Form.Control
                  value={this.state.user}
                  onChange={this.setUsername}
                  className='Control'
                  type='text'
                  placeholder='Enter Username'
                />
              </Col>
              <Col>
                <Form.Label className='Label'>New Email:</Form.Label>
                <Form.Control
                  value={this.state.email}
                  onChange={this.setEmail}
                  className='email'
                  type='email'
                  placeholder='Enter Email'
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className='Label'>New Birthday:</Form.Label>
                <Form.Control
                  value={this.state.birthday}
                  onChange={this.setBirthday}
                  className='birthday'
                  type='date'
                  placeholder='Enter Birthday'
                />
              </Col>
              <Col>
                <Form.Label className='Label'>New Password:</Form.Label>
                <Form.Control
                  value={this.state.password}
                  onChange={this.setPassword}
                  className='Control2'
                  type='password'
                  placeholder='Enter Password'
                />
              </Col>
            </Row>
            <br />
            <Row className='Button'>
              <Col>
                <Button type='button' variant='dark' onClick={handleUpdate}>
                  Update
                                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <Button type='button' variant='danger' onClick={handleDeregister}>
          Delete Account
                </Button>
      </Container>
    );
  }
}