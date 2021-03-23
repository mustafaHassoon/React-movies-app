import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Container className='container'>
        <div className="container-fluid align-items-center ml-3 mt-2">

          <img className="movie-poster" src={movie.ImagePath} />
          <div className="movie-title">
            <h2 className="value">{movie.Title}</h2>
          </div>

          <div className="movie-description">
            <h5 className="value">Description:</h5>
            <h6 className="value">{movie.Description}</h6>
          </div>

          <div className="movie-genre">
            <h5 className="value">Genre: {movie.Genre.Name}</h5>
          </div>

          <div className="movie-director">
            <h5 className="value">Director: {movie.Director.Name}</h5>
          </div>

          <Button type='button' variant='dark' onClick={() => window.open("mainView", "_self")}>Back</Button>

        </div>
      </Container>

    );
  }
}