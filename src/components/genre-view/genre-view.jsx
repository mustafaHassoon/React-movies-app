import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import { MainView } from '../main-view/main-view';


export class GenreView extends React.Component {


  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (

      <Container className='container'>
        <h1>genre </h1>

      </Container>

    );
  }
}