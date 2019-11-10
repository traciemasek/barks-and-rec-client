import React, { Component } from 'react';
import AdopterDogCard from './AdopterDogCard';
import { connect } from 'react-redux';
import { fetchDogs } from '../actions';
import { Grid, Card, Segment, Header, Container } from 'semantic-ui-react';
// import { Switch, Route } from 'react-router-dom';

class DogsContainer extends Component {

  // now fetching in AdopterMain
  // componentDidMount(){
  //   this.props.fetchDogs()
  // }


  renderDogs = () => {
    let favoriteIds = this.props.favoriteDogs.map(favorite => favorite.id)
    return this.props.dogs.map(dog => {
      return favoriteIds.includes(dog.id)
      ?
      <AdopterDogCard key={dog.id} dog={dog} favorite={true}/>
      :
      <AdopterDogCard key={dog.id} dog={dog} />
    })
  }

  render() {
    // console.log("DOG CONTAINER PROPS", dog, favoriteDog)
    if (this.props.dogsLoading || this.props.userLoading) {
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
      return (
        
        <Grid centered>
  
          <Grid.Row centered>
            <Segment basic>
              <Header as={"h1"}>Meet our available dogs!</Header>
              <Container text>
            <p> If a dog is listed here, that means they are AVAILABLE for adoption. </p>

          <p>While we may have pending adoption applications ahead of you for your dog of interest, the best thing to do is still to apply. Once you are approved, you remain approved for any new dogs that we rescue in the future!</p>
          </Container>
            </Segment>
          </Grid.Row>
          <Grid.Row></Grid.Row>
          
          <Card.Group centered>
            {this.renderDogs()}
          </Card.Group>
       
        </Grid>
        
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

export default connect(msp, { fetchDogs })(DogsContainer)