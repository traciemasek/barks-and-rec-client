import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdopterDogCard from './AdopterDogCard';
import { Container, Grid, Card } from 'semantic-ui-react'

class FavesContainer extends Component {

  renderFavorites = () => {
    return this.props.favorites.map(dog=><AdopterDogCard key={dog.id} dog={dog} favorite/>)
  }

  //need functionality to remove a favorite

  render() {
    if(this.props.userLoading){
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
        return (
          <Container fluid>
            <br/>
              <Container>
                <Grid centered>
                  <Card.Group>
                  {this.renderFavorites()}
                  </Card.Group>
                </Grid>
              </Container>
           
        </Container>
      )
    }
  }
}

function msp(state) {
  return {
    favorites: state.favorites,
    userLoading: state.userLoading
  }
}

export default connect(msp)(FavesContainer)
