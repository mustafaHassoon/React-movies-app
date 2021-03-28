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
import axios from 'axios';

export class MovieCard extends React.Component {

  render() {

    const { movie } = this.props;

    var token = localStorage.getItem('token');
    var username = localStorage.getItem('user');
    var favoriteMovies = localStorage.getItem('favoriteMovies');
    let favoriteMoviesArray = favoriteMovies.split(",");

    const addButton = (movieId) => {
      if (favoriteMovies) {
        for (var i = 0; i < favoriteMoviesArray.length; i++) {
          if (movieId === favoriteMoviesArray[i]) {
            return (<Button type='button' variant='dark' onClick={handleRemoveMovieFromFavorites}>
              Remove from favorites
            </Button>);
          }
        }

        return (<Button type='button' variant='dark' onClick={handleAddMovieToFavorites}>
          Add to favorites
        </Button>);
      } else {
        return (<Button type='button' variant='dark' onClick={handleAddMovieToFavorites}>
          Add to favorites
        </Button>);
      }
    };

    const handleAddMovieToFavorites = (e) => {
      let url = 'https://shrouded-beach-69227.herokuapp.com/users/' + String(username) + '/Movies/' + `${movie._id}`;
      axios.post(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          let newFavoriteMovies = favoriteMovies + ',' + `${movie._id}`;
          localStorage.setItem('favoriteMovies', newFavoriteMovies);
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error add movie to the user', e, url)
        });
    };

    const handleRemoveMovieFromFavorites = (e) => {
      let url = 'https://shrouded-beach-69227.herokuapp.com/users/' + String(username) + '/Movies/' + `${movie._id}`;
      axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          let newFavoriteMovies = favoriteMovies.replace(`${movie._id}`, '');
          localStorage.setItem('favoriteMovies', newFavoriteMovies);
          const data = response.data;
          console.log(data);
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('error remove movie from the user', e, url)
        });
    };


    return (
      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          {addButton(movie._id)}
        </Card.Body>
      </Card>

    );
  }
}
