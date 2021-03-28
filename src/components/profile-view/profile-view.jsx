import React from 'react';

import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './profile-view.scss';

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import { useState } from 'react';

import { MainView } from '../main-view/main-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';


export function ProfileView(props) {

  var token = localStorage.getItem('token');
  var username = localStorage.getItem('user');

  // const [ update, setUpdate] = useState(false);

  const handleDeregister = (e) => {

    let url = 'https://shrouded-beach-69227.herokuapp.com/users/' + String(username);
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

  const passwordUpdate = (event) => {
    event.preventDefault();
    setUpdate(true)
  }


  const handleUpdate = (e) => {

    let url = 'https://shrouded-beach-69227.herokuapp.com/users/' + String(username);
    axios.put(url, {
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
    <Button type='button' variant='danger' onClick={handleDeregister}>
      Delete Account
    </Button>
  );
}