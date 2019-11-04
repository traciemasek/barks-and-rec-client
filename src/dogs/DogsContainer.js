import React, { Component } from 'react';
import AdopterDogCard from './AdopterDogCard';
// import DogShow from './DogShow';
import { Grid, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchDogs } from '../actions';
// import { Switch, Route } from 'react-router-dom';

class DogsContainer extends Component {

  // componentDidMount(){
  //   this.props.fetchDogs()
  // }


  renderDogs = () => {
    //add a prop of favorite if the dog is in the user's favorites?
    //something like a double iteration (dog=> {
    // if (this.props.favorites.includes(dog)) {add the favorite key to props <AdopterDogCard key={dog.id} dog={dog} favorite />}
    // else {
      // regular <AdopterDogCard key={dog.id} dog={dog}/>
    // }
    // })
    return this.props.dogs.map(dog=><AdopterDogCard key={dog.id} dog={dog}/>)
  }

  render() {
    // console.log("DOG CONTAINER PROPS", this.props)
    if (this.props.dogsLoading) {
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
      return (
        
        <Container fluid>
            
          <p>Right now, admin and adopter are rending the same component, but it'll probably have different instructions and the dog cards will be different for each type of user. should i just make a separate container and cards for admins and adopters? probably.</p>
  
          <p>Need to fix the grid and make the heart clickable (which will actually happen on the card</p>
            
          <p>Clicking on the card should route to and render to the individual dog's show page</p>
          
          
          <Grid centered>
            {this.renderDogs()}
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
    dogsLoading: state.dogsLoading,
    favorites: state.favorites
  })
}

export default connect(msp, { fetchDogs })(DogsContainer)