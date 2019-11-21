import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Splash from './Splash';
import AdminMainContainer from './admin/AdminMainContainer';
import AdopterMainContainer from './adopter/AdopterMainContainer';
import { setAdmin, setAdopter } from './actions.js';
import UhOh from './UhOh'


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
      if (response.errors) {
        alert(response.errors)
      } else if(response.admin){
      this.props.setAdmin(response.admin)
      } else {
      this.props.setAdopter(response)
    }
    })
  }

  render() {
    console.log("APP PROPS", this.props)
      if(localStorage.token && this.props.userLoading) {
        return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
      } else {
        return (
          <div className="App">
            <Switch>
              {/* if you are logged in and try to go to '/', redirect to admin or adopter main */}
              <Route exact path="/">
                {localStorage.token
                ? 
                <Redirect to={this.props.admin && !this.props.userLoading ? "/admin": "/adopter"}/>
                :
                <Splash/>
                }
              </Route>
              {/* if you are not logged in or admin is not true, redirect to "/" or adopter? */}
              <Route path="/admin">
                {localStorage.token && !this.props.userLoading && this.props.admin 
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
              <Route component={UhOh} />
            </Switch>
          
        </div>
      );
    } //end of else
  }//end of render
}

function msp(state){
  return {
    user: state.user,
    userLoading: state.userLoading,
    tasksLoading: state.tasksLoading,
    admin: state.admin,
    favorites: state.favorites,
    favoriteDogs: state.favoriteDogs,
    adopterApplication: state.adopterApplication,
    applications: state.applications,
    tasks: state.tasks,
    allFavorites: state.allFavorites,
    adopterNotifications: state.adopterNotifications
  }
}

export default connect (msp, { setAdmin, setAdopter })(App);

