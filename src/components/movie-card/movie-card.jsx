import React from 'react';

// importing react router
import { BrowserRouter as Router, Route } from "react-router-dom";

import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';

import { MovieView } from '../movie-view/movie-view';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  render() {

    // const { movie } = this.props;

    const { movie } = this.props;

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}