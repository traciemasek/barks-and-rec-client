import React, { Component } from 'react';
import AdminDogCard from './AdminDogCard';
import { Grid, Container, Card , Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchDogs } from '../actions';
// import { Switch, Route } from 'react-router-dom';

class AdminDogsContainer extends Component {

  renderDogs = () => {
    // let favoriteIds = this.props.favoriteDogs.map(favorite => favorite.id)
    return this.props.dogs.map(dog => <AdminDogCard key={dog.id} dog={dog} />)
  }

  render() {
    // console.log("DOG CONTAINER PROPS", dog, favoriteDog)
    if (this.props.dogsLoading || this.props.userLoading) {
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
      return (
        
        <Container fluid>
          <Segment basic></Segment>  
          <Segment>Need to fix the buttons to make them not have a clicky feel. ALSO admin needs to be able to edit current dogs off show page AND add new dog</Segment>
  
          <Grid centered>
            <Card.Group centered>
              {this.renderDogs()}
            </Card.Group>
          </Grid>
  
        </Container>
        
      )
    }
  }
}

function msp(state) {
  return ({
    user: state.user,
    dogs: state.dogs,
    userLoading: state.userLoading,
    dogsLoading: state.dogsLoading,
    favorites: state.favorites,
    favoriteDogs: state.favoriteDogs
  })
}

export default connect(msp, { fetchDogs })(AdminDogsContainer)