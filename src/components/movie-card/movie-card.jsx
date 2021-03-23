import React from 'react';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MovieCard extends React.Component {
  render() {

    const { movie, onClick } = this.props;

    return (
      <div className="col-10 col-lg-3 ml-5 mt-5">
        <Row>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button onClick={() => onClick(movie)} variant='dark'>
                more
            </Button>
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
}