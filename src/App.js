// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Splash from './Splash';

//App is wrapped in Route path="/" so "/" is established as base url--unsure how that might affect auth
class App extends React.Component {
  //might be able to make this a functional component

  adminLogin = () => {}

  adopterLogin = () => {}

  adopterSignUp = () => {}

  render() {
    console.log("APP PROPS", this.props)
    return (
      <div className="App">
        {/* Since Header is on every page, it can be outside of routes */}
        {/* <Header /> */}
        <Switch>
          {/* had to remove 'exact path' to get the form routes to render in the Splash component. Not sure I want routes--might just want conditional rendering of the forms?? */}
          <Route path="/" component={Splash} />
          {/* rather than routing to the 3 diff log in/sign up forms, i want to conditionally render them in the splash component */}

          {/* unsure if i need exact path for /admin or /adopter */}
          <Route path="/admin" render={()=><div>I'll be the Admin main page</div>}/>
          {/* can do nested routes path="/adopter/dogs" */}
          <Route path="/adopter/dogs" render={()=><div>I'll be the Adopter dogs page </div>}/>
          {/* should all the nested routes be in a switch in the AdopterContainer?? that way if i pass something to /adopter here it should render on all the children routes???? maybe? */}
          <Route path="/adopter" render={()=><div>I'll be the Adopter main page. Anything rendered here will show up on all nested '/adopter' pages unless I put `exact path` So maybe I should put the side nav here. Oh wait if I use switch, then it acts like exact path and will only show whatever is explicitly rendered on each route</div>}/>
      </Switch>
      
         
    </div>
    );
  }
}

function msp(state){
  //whatever object is returned from msp will be combined with this component's props 
  //reader/getter for store of state
  return state
  //probably won't want to return the entire store of state, so extract what you need aka shopping at the state store
  //return { likes: state.likes, things: state.things}
}

function mdp(dispatch) {
  //writer/setter to state
  //return functions that will be added to props, and then you can call onClick or wherever you want to trigger them to setState via redux dispatch/reducer
  //THINKING AHEAD my handleLogin functions will call this.props.login (or whatever I call it in the mdp return) to setState in store once I get the user authed on the back end

  //dispatch calls the reducer, which setsState
  return {
    //eventually these functions will be abstracted to a different file
    like: () => {
      dispatch({type: "INCREMENT_LIKES"})
      //call this in the onClick for the like button onClock={props.like} since mdp automatically updates props with whatever you use here
    },
    //example below is from a controlled form that implicitly passes the event, which we then use to set the payload
    //can also pass arguments just like in other eventlisteners
    // handleChange: (event) => {
    //   dispatch({type: "INPUT_CHANGE", payload: event.target.value})
    // }
  }

}


//connect connects this component to the store
//takes 2 arguments: mapStateToProps & mapDispatchToProps
export default connect(msp, mdp)(App);

//want to test double auth:
//need routes
//need auth


