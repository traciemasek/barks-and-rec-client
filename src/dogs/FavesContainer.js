import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdopterDogCard from './AdopterDogCard';
import AdoptableDogsTeaserCard from '../teasers/AdoptableDogsTeaserCard'
import { Container, Grid, Card } from 'semantic-ui-react'

class FavesContainer extends Component {

  renderFavorites = () => {
    return this.props.favoriteDogs.map(dog=><AdopterDogCard key={dog.id} dog={dog} favorite/>)
  }

  //need functionality to remove a favorite

  render() {
    if(this.props.userLoading || this.props.dogsLoading){
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    // } else if (!this.props.favoriteDogs.length) {
    } else if (!this.props.favoriteDogs.length) {
      return (
        <>
          <p>You don't have any favorite dogs yet! Check out the list of dogs currently available for adoption and click the heart to save it to your list!</p>
          <AdoptableDogsTeaserCard />
        </>
      )
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
    favoriteDogs: state.favoriteDogs,
    userLoading: state.userLoading,
    dogsLoading: state.dogsLoading
  }
}

export default connect(msp)(FavesContainer)
