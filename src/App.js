import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Grid } from 'semantic-ui-react'
import Splash from './Splash';
// import HeaderAdopter from './menus/HeaderAdopter'
import AdminMainContainer from './admin/AdminMainContainer'
import AdopterMainContainer from './adopter/AdopterMainContainer'
// import { functions from actions.js} from './actions.js'

//App is wrapped in Route path="/" so "/" is established as base url--unsure how that might affect auth
class App extends React.Component {


  componentDidMount() {
    const token = localStorage.token
    if (token) {
      this.autoLogin(token)
    }
    this.fetchDogs()
    this.fetchAdopters()
    this.fetchApplications()
    //maybe doing this in redux is dumb? we more or less want things to be loading until the user is set
    this.props.stopLoading()
    // this.setState({loading: false})
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
      this.props.setAdmin(response.admin)
      } else {
      this.props.setAdopter(response)
    }
    })
  }


  fetchDogs = () => {
    fetch("http://localhost:6969/api/v1/dogs")
    .then(resp => resp.json())
    .then(dogs => {
      //this is how this function talks to redux. It has access to the function we wrote in mdp that calls dispatch to change the state store with the reducer
      this.props.fetchDogs(dogs)
      //if you want to have this control loading render
      //this.setState({loading: false})
    })
  }

  //probably want to move these fetches
  fetchAdopters = () => {
    fetch("http://localhost:6969/api/v1/adopters")
    .then(resp => resp.json())
    .then(adopters => {
      this.props.fetchAdopters(adopters)
    })
  }

  fetchApplications = () => {
    fetch("http://localhost:6969/api/v1/applications")
    .then(resp => resp.json())
    .then(applications => {
      this.props.fetchApplications(applications)
    })
  }

  render() {
    console.log("APP PROPS", this.props)
    if (this.props.loading) {
      return (
        <img 
          alt="fetching" 
          src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"
          />
      )
    } else {
      return (
        <div className="App">
          {/* NEED CONDITIONAL RENDERING BASED ON ROLE */}
          {/* {this.props.admin ? () 
          : ()} */}
          {/* <HeaderAdopter /> */}
          
          <Switch>
            <Route exact path="/" component={Splash} />
        
            <Route path="/admin" render={(routerProps)=><AdminMainContainer {...routerProps}/>}/>
  
            <Route path ="/adopter" render={(routerProps) => <AdopterMainContainer {...routerProps}/>}/>
  
            {/* 404 */}
            <Route render={() => <img alt="404 Not Found" src="https://httpstatusdogs.com/img/404.jpg"></img>} />
          </Switch>         
      </div>
      );

    }
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
  //dispatch calls the reducer, which setsState. For every time you need to set global state, you need to set up a function that calls dipatch in the mpd object here (1:24:00 react + redux 042219)
  return {
    //eventually these functions will be abstracted to a different file actions.js and we can remove mdp all together
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
// export default connect (msp, {fetchDogs, setAdmin, setAdopter, fetchApplications, fetchAdopters, stopLoading})(App;)

//want to test double auth:
//need routes
//need auth


