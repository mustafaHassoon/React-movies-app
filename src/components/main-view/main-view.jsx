import React from 'react';

import axios from 'axios';

import { connect } from 'react-redux';

// importing reac router
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Link } from "react-router-dom";

import { setMovies } from '../../actions/actions';

//bootstap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';

import MoviesList from '../movies-list/movies-list';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';


export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      favoriteMovies: null,
    };
  }
  //new getMovies method
  getMovies(token) {
    axios.get('https://shrouded-beach-69227.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {

        //assign the results to the actions 
        this.props.setMovies(response.data);

        // Assign the result to the state
        // this.setState({
        //   movies: response.data
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        favoriteMovies: localStorage.getItem('favoriteMovies'),
      });
      this.getMovies(accessToken);
    }
  }


  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      favoriteMovies: authData.user.FavoriteMovies,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = "/";
  }

  render() {
    // const { movies, user } = this.state;

    let { movies } = this.props;
    let { user } = this.state;

    let profileButton;
    let logoutButton;
    if (user) {
      logoutButton = <Row><Col><Button variant="danger" size="lg" block onClick={this.onLoggedOut} >Logout</Button></Col>
      </Row>

      profileButton = <Row><Col> <Link to={`/profile/${user}`}>
        <Button variant="dark" size="lg" block>Profile</Button>
      </Link></Col></Row>
    }
    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (!movies) return <div className="main-view" />;

    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <Router basename="/client">
              <div className="main-view">
                <div className="bottun-main">{logoutButton}</div>

                {profileButton}
                <Route exact path="/" render={() => {
                  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  return <MoviesList movies={movies} />;
                }
                } />
                <Route path="/register" render={() => <RegistrationView />} />
                <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

                <Route path="/genres/:name" render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                }
                } />

                <Route path="/directors/:name" render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                }
                } />
                <Route path="/profile/:username" render={() => {
                  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  return <ProfileView user={user} />
                }
                } />
              </div>

            </Router>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies })(MainView);
