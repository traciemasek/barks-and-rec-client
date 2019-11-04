import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import DogShow from '../dogs/DogShow'
import DogsContainer from '../dogs/DogsContainer';
import FavesContainer from '../dogs/FavesContainer';
import ApplicationContainer from './ApplicationContainer';
import HeaderAdopter from '../menus/HeaderAdopter';
import AdoptableDogsTeaserCard from '../teasers/AdoptableDogsTeaserCard'
import FavoriteDogsTeaserCard from '../teasers/FavoriteDogsTeaserCard'
import ApplicationTeaserCard from '../teasers/ApplicationTeaserCard'
import { fetchDogs } from '../actions';

class AdopterMainContainer extends React.Component {

  componentDidMount(){
    this.props.fetchDogs()
  }
  
  render() {
    // console.log("ADOPTER MAIN PROPS", this.props)
    // console.log("ADOPTER MAIN STATE", this.state)
    if (this.props.loading) {
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
      return (
        <div>
          <HeaderAdopter />
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
              <h1>Welcome potential adopters</h1>
              <div>
                This will be some sort of navigation that will likely live to the side <span role="img" aria-label="left arrow">⬅️</span> or maybe like some fancy dropdown shit
              </div>
      
              <p></p>

      
              <p>If they don't have any favorited dogs, My Faves should be a greyed out photo with instructions to add some</p>
      
              <p>If the user hasn't submitted an application, the teaser should say "Submit an application to adopt" else it should say "Application Status"</p>
              
              <AdoptableDogsTeaserCard />
              <FavoriteDogsTeaserCard />
              <ApplicationTeaserCard />
             
      
              {/* <Link to="/adopter/dogs">
                <button>See all dogs</button>
              </Link>

              <Link to="/adopter/faves">
                <button>My favorite dogs</button>
              </Link>
      
              <Link to="/adopter/application">
                <button>Application</button>
              </Link> */}
              </>
              )
            }} />
            
          </Switch>
            
          
        </div>
      )
    }
  }
}

function msp(state){
  // console.log("adopter main state", state)
  return {
    user: state.user,
    dogs: state.dogs,
    loading: state.loading
  }
}


export default connect(msp, { fetchDogs })(AdopterMainContainer)
