import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Grid } from 'semantic-ui-react'
import Splash from './Splash';
import AdminMainContainer from './admin/AdminMainContainer'
import AdopterMainContainer from './adopter/AdopterMainContainer'
import { setAdmin, setAdopter } from './actions.js'


class App extends React.Component {

  componentDidMount() {
    const token = localStorage.token
    if (token) {
      this.autoLogin(token)
    }
  }

  autoLogin = (token) => {
    fetch("http://localhost:6969/api/v1/auto_login", {
      headers: {
        "Authorization": token
      }
    })
    .then(resp => resp.json())
    .then(response => {
      // console.log(response)
      if (response.errors) {
        alert(response.errors)
      } else if(response.admin){
        // look at back end to see exactly how you're rendering this
      this.props.setAdmin(response.admin)
      } else {
      this.props.setAdopter(response)
    }
    })
  }

  render() {
    console.log("APP PROPS", this.props)
      if(this.props.userLoading) {
        return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
      } else {
        return (
          <div className="App">
            <Switch>
              {/* if you are logged in and try to go to '/', redirect to admin or adopter main */}
              <Route exact path="/">
                {localStorage.token 
                ? 
                <Redirect to={this.props.admin ? "/admin": "/adopter"}/>
                :
                <Splash/>
                }
              </Route>
              {/* if you are not logged in or admin is not true, redirect to "/" or adopter? */}
              <Route path="/admin">
                {localStorage.token && this.props.admin
                ?
                <AdminMainContainer />
                :
                <Redirect to={localStorage.token && !this.props.admin ? "/adopter": "/"}/>
                }
              </Route>
              {/* if you are not logged in or admin is not false, redirect to "/" or admin? */}
              <Route path="/adopter">
                {localStorage.token && !this.props.admin
                ?
                <AdopterMainContainer />
                :
                <Redirect to={localStorage.token && this.props.admin ? "/admin": "/"}/>
                }
              </Route>

              {/* 404 */}
              <Route render={() => <img alt="404 Not Found" src="https://httpstatusdogs.com/img/404.jpg"></img>} />
            </Switch>
          
        </div>
      );
    } //end of else
  } //end of render
}

function msp(state){
  return {
    user: state.user,
    userLoading: state.userLoading,
    admin: state.admin
  }
  //probably won't want to return the entire store of state, so extract what you need aka shopping at the state store
  //return { likes: state.likes, things: state.things}
}

export default connect (msp, { setAdmin, setAdopter })(App);

// GRAVEYARD OF OLD CODE
 /* <Switch>    
            <Route exact path="/" component={Splash} />
        
            <Route path="/admin" component={AdminMainContainer}/>
  
            <Route path ="/adopter" component={AdopterMainContainer}/> 
  
            // 404 
            {/* <Route render={() => <img alt="404 Not Found" src="https://httpstatusdogs.com/img/404.jpg"></img>} />
          </Switch>          */


//need to fetch dogs in adopter & admin
  // fetchDogs = () => {
  //   fetch("http://localhost:6969/api/v1/dogs")
  //   .then(resp => resp.json())
  //   .then(dogs => {
  //     this.props.fetchDogs(dogs)
  //   })
  // }

  // //probably want to move these fetches to admin 
  // fetchAdopters = () => {
  //   fetch("http://localhost:6969/api/v1/adopters")
  //   .then(resp => resp.json())
  //   .then(adopters => {
  //     this.props.fetchAdopters(adopters)
  //   })
  // }

  // fetchApplications = () => {
  //   fetch("http://localhost:6969/api/v1/applications")
  //   .then(resp => resp.json())
  //   .then(applications => {
  //     this.props.fetchApplications(applications)
  //   })
  // }

// function mdp(dispatch) {
//   //writer/setter to state
//   //return functions that will be added to props, and then you can call onClick or wherever you want to trigger them to setState via redux dispatch/reducer
//   //dispatch calls the reducer, which setsState. For every time you need to set global state, you need to set up a function that calls dipatch in the mpd object here (1:24:00 react + redux 042219)
//   return {
//     //eventually these functions will be abstracted to a different file actions.js and we can remove mdp all together
//     stopLoading: () => {
//       dispatch({type: "STOP_LOADING"})
//       // dispatch(stopLoading())
//     },
//     fetchDogs: dogs => {
//       dispatch({type: "FETCH_ALL_DOGS", payload: dogs})
//       // dispatch(fetchDogs(dogs))
//     },
//     fetchAdopters: adopters => {
//       dispatch({type: "FETCH_ALL_ADOPTERS", payload: adopters})
//     },
//     fetchApplications: applications => {
//       dispatch({type: "FETCH_ALL_APPLICATIONS", payload: applications})
//     },
//     setAdmin: admin => {
//       dispatch({type: "SET_ADMIN_USER", payload: admin})
//     },
//     setAdopter: adopter => {
//       dispatch({type: "SET_ADOPTER_USER", payload: adopter})
//     }
//     //example below is from a controlled form that implicitly passes the event, which we then use to set the payload
//     //can also pass arguments just like in other eventlisteners
//     // handleChange: (event) => {
//     //   dispatch({type: "INPUT_CHANGE", payload: event.target.value})
//     // }
//   }
// }


