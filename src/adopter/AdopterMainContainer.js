import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import DogShow from '../dogs/DogShowAdopter'
import DogsContainer from '../dogs/DogsContainer';
import FavesContainer from '../dogs/FavesContainer';
import ApplicationContainer from './ApplicationContainer';
import HeaderAdopter from '../menus/HeaderAdopter';
import AdoptableDogsTeaserCard from '../teasers/AdoptableDogsTeaserCard'
import FavoriteDogsTeaserCard from '../teasers/FavoriteDogsTeaserCard'
import ApplicationTeaserCard from '../teasers/ApplicationTeaserCard'
import { fetchDogs } from '../actions';
import { Grid, Card } from 'semantic-ui-react'

class AdopterMainContainer extends React.Component {

  componentDidMount(){
    this.props.fetchDogs()
  }
  
  render() {
    // console.log("ADOPTER MAIN PROPS", this.props)
    // console.log("ADOPTER MAIN STATE", this.state)
    if (this.props.userLoading || this.props.dogsLoading) {
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
      return (
        <>
        <HeaderAdopter />
        <Grid centered>
          <Grid.Row></Grid.Row>
        <Grid.Column width={12}>

          <Switch>
            <Route path="/adopter/dogs/:id" render={routerProps => {
              const { match } = routerProps
              const dogId = match.params.id
              return (
                <DogShow dogId={dogId}/>
              )
            }} />
            <Route path="/adopter/dogs" render={() => {
              return <DogsContainer />
            }}/>
            <Route path="/adopter/faves" render={() => {
              return <FavesContainer />
            }} />
            <Route path="/adopter/application" render={() => {
              return <ApplicationContainer />
            }} />
            <Route path="/adopter" render={()=>{
              return (
              <>
              <Grid verticalAlign="top" centered>
                <Grid.Row>
                  <h1>Welcome potential adopters</h1>
                </Grid.Row>
                <Grid.Row></Grid.Row>

                <Card.Group centered>
                  <AdoptableDogsTeaserCard />
                  <FavoriteDogsTeaserCard />
                  <ApplicationTeaserCard />
                </Card.Group>
              </Grid>
              
             </>
              )
            }} />
            
          </Switch>
        </Grid.Column>
      </Grid>
    </>
    )
    }
  }
}

function msp(state){
  // console.log("adopter main state", state)
  return {
    user: state.user,
    dogs: state.dogs,
    userLoading: state.userLoading,
    dogsLoading: state.dogsLoading
  }
}


export default connect(msp, { fetchDogs })(AdopterMainContainer)
