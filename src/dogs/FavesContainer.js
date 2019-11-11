import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdopterDogCard from './AdopterDogCard';
import AdoptableDogsTeaserCard from '../teasers/AdoptableDogsTeaserCard'
import { Container, Grid, Card, Header } from 'semantic-ui-react'

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
        <Grid centered >
          <Grid.Row></Grid.Row>
          <Grid.Row verticalAlign="middle">
          <Header style={{fontFamily: "Roboto"}} as="h1">You don't have any favorite dogs yet!</Header>
          </Grid.Row>

          <Grid.Row>
          <Header style={{fontFamily: "Roboto"}} as="h3">Check out the list of dogs currently available for adoption and click the heart to add it to your favorites!</Header>
          </Grid.Row>
          
          <AdoptableDogsTeaserCard />
        </Grid>
      )
    } else {
        return (
          <Container fluid>
            <br/>
              <Container>
                <Grid centered>
                  <Grid.Row>
                    <Header size="huge">Favorites</Header>
                  </Grid.Row>
                  
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
