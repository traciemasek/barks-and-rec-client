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


### Redux + React 042219
1:20:00 ish is when he talks about passing args to mdp as payload

npm i redux react-redux --save

### Implementing Redux 042219
-function called in component
-arguments from function call passed to dispatch
-dispatch calls reducer with action (type and payload)
-reducer returns some sort of modified state

function mdp(dispatch) {
  //writer/setter to state
  //return functions that will be added to props, and then you can call onClick or wherever you want to trigger them to setState via redux dispatch/reducer
  //dispatch calls the reducer, which setsState. For every time you need to set global state, you need to set up a function that calls dipatch in the mpd object here (1:24:00 react + redux 042219)
  return {
    //eventually these functions will be abstracted to a different file actions.js
    stopLoading: () => {
      dispatch({type: "STOP_LOADING"})
      // dispatch(stopLoading())
    },
    fetchDogs: dogs => {
      dispatch({type: "FETCH_ALL_DOGS", payload: dogs})
      // dispatch(fetchDogs(dogs))
    },
    fetchAdopters: adopters => {
      dispatch({type: "FETCH_ALL_ADOPTERS", payload: adopters})
    },
    fetchApplications: applications => {
      dispatch({type: "FETCH_ALL_APPLICATIONS", payload: applications})
    },
    setAdmin: admin => {
      dispatch({type: "SET_ADMIN_USER", payload: admin})
    },
    setAdopter: adopter => {
      dispatch({type: "SET_ADOPTER_USER", payload: adopter})
    }
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

## Authorization
-can cp Steven's code from 051319 Authorization and Security lecture from ApplicationController & AuthController for basic single user auth template