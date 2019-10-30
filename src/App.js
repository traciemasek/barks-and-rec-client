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
  return state
  //probably won't want to return the entire store of state, so extract what you need aka shopping at the state store
  //return { likes: state.likes, things: state.things}
}


//connect connects this component to the store
//takes 2 arguments: mapStateToProps & mapDispatchToProps
export default connect(msp)(App);

//want to test double auth:
//need routes

//STEVEN LECTURE NOTES
//router: give it what route you want it to hit, and what you want it to render
//do you have all routes in app.js? not always, you can write nested routes but all basic main pages usually have a place in app in Switch
//see 23:00 into the 051319 lecture about if you want something to appear on every page that starts with /adopter or /admin (so nav bar probably), then don't use exact path and put it all in /adopter, which would be under /adopter/dogs. If you only want very specific things to be on /adopter and nowhere else, then use exact path="/adopter"
//Switch works the same as calling everything exact path=, but remember order matters so '/' would have to be at the very bottom which sort of doesn't make sense to me since it's basically the first page of the app. 
//Switch will only render one route at a time! Use it at top level of all routes to switch between the major pages (28:31)
//How are all these routes going to work when I have auth? Will I need the switch or will i use the ProtectedRoute component to route to either splash or admin/adopter and write switch routes elsewhere?

//ROUTER PROPS
//match has params
//if using render in Route, then pass props render={(routerProps) => <Splash handleLogin={this.handleLogin} {...routerProps} />}/>

//need auth

//<Switch
