import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdopterDogCard from './AdopterDogCard';
import AdoptableDogsTeaserCard from '../teasers/AdoptableDogsTeaserCard'
import { Container, Grid, Card, Header, Segment } from 'semantic-ui-react'

class FavesContainer extends Component {

  renderFavorites = () => {
    return this.props.favoriteDogs.map(dog=><AdopterDogCard key={dog.id} dog={dog} favorite/>)
  }


  render() {
    if(this.props.userLoading || this.props.dogsLoading){
      return (
        <Grid centered>
          <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
        </Grid>
      )
    } else if (!this.props.favoriteDogs.length) {
      return (
        <Grid centered>
          <Grid.Row></Grid.Row>
          <Grid.Column width={12}>
            <Grid centered>
              <Grid.Row></Grid.Row>
              <Grid.Row></Grid.Row>
              <Grid.Row></Grid.Row>
        
              <Grid.Row centered>
                <Header style={{fontFamily: "Roboto"}} as="h1">You don't have any favorite dogs yet!</Header>
              </Grid.Row>

              <Grid.Row>
                <Header style={{fontFamily: "Roboto"}} as="h3">Check out the list of dogs currently available for adoption and click the heart to add it to your favorites!</Header>
              </Grid.Row>

              <Grid.Row></Grid.Row>
              <AdoptableDogsTeaserCard />
          </Grid>
        </Grid.Column>
      </Grid>
      )
    } else {
        return (
          <Grid centered>
            <Grid.Row></Grid.Row>
            <Grid.Column width={12}>
    
              <Grid centered>

              <Grid.Row centered>
                <Segment basic>
                
                  <Header as="h1" style={{fontFamily: "Roboto"}}>Favorites</Header>
                  <Container text>
                    <p style={{fontFamily: "Roboto"}}> Dogs you're interested in adopting. </p>
                  </Container>
                    
                </Segment>
              </Grid.Row>
              <Grid.Row></Grid.Row>

              <Card.Group itemsPerRow={3} centered>
              {this.renderFavorites()}
              </Card.Group>
            </Grid>
             
          </Grid.Column>
        </Grid>
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
