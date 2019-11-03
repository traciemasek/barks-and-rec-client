import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DogShow from '../dogs/DogShow'
import DogsContainer from '../dogs/DogsContainer';
import FavesContainer from '../dogs/FavesContainer';
import ApplicationContainer from './ApplicationContainer';

class AdopterMainContainer extends React.Component {

  //will likely need local state for conditional rendering
  state = {
    //loading: true
  }
  
  render() {
    // console.log("ADOPTER MAIN PROPS", this.props)
    // console.log("ADOPTER MAIN STATE", this.state)
    return (
      <div>

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
    
            <p>Need conditional rendering here. If the adopter has just signed up, this should show a welcome page with info on how to use the app. If they've logged in before, it should render the 3 teaser cards: Adoptable Dogs, My Faves, My Application, which should route to the appropriate routes and render the appropriate components. </p>
    
            <p>If they don't have any favorited dogs, My Faves should be a greyed out photo with instructions to add some</p>
    
            <p>If the user hasn't submitted an application, the teaser should say "Submit an application to adopt" else it should say "Application Status"</p>
    
           
            {/* <Link to="/adopter/dogs">
              <button>See all dogs</button>
            </Link>  */}
            <button onClick={()=>this.props.history.push("/adopter/dogs")}>See all dogs</button>
    
            <Link to="/adopter/faves">
              <button>My favorite dogs</button>
            </Link>
    
            <Link to="/adopter/application">
              <button>Application</button>
            </Link>
            </>
            )
          }} />
          
        </Switch>
          
        
      </div>
    )
  }
}

function msp(state){
  // console.log("adopter main state", state)
  return {
    dogs: state.dogs
  }
}

// function mdp(dispatch){
//   //moved the fetch to App bc it needs to happen earlier
//   return {
//     fetchDogs: (dogs) => {
//       dispatch({type: "FETCH_ALL_DOGS", payload: dogs})
//     }
//   }
// }

export default connect(msp)(AdopterMainContainer)
