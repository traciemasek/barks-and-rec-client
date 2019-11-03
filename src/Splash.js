import React from 'react';
import LoginAdmin from "./forms/LoginAdmin"
import LoginAdopter from "./forms/LoginAdopter"
import SignupAdopter from "./forms/SignupAdopter"
import HeaderSplash from "./menus/HeaderSplash"
// import { Route, Switch, Link } from "react-router-dom"


class Splash extends React.Component {

  state = {
    formType: null
  }

  handleMenuItemClick = name => {
    this.setState({
      formType: name
    })
  }
  
  //ultimately, I don't think I want routes bc I don't want the user to be able to go directly to any of these log in paths
  //should use state to conditionally render the form components instead upon button click
  //routes might be better bc i can render the menu and jumbotron once hopefully
  //the case statement is gnarly; is there anyway to make this better? (Would probably need a ternary since JSX requires expressions)
  //maybe once I have the header and image as separate components it'll be better??
  render() {
    console.log("SPLASH state", this.state)
 
    switch (this.state.formType) {
      case "admin log in":
          return (
            <div>
              <HeaderSplash handleMenuItemClick={this.handleMenuItemClick}/>
          
              <br/>
              <h1>Admin Log In Form:</h1>
              <LoginAdmin/>
              <br/>
            </div>
          )
      case "adopter log in":
          return (
            <div>
              <HeaderSplash handleMenuItemClick={this.handleMenuItemClick}/>
            
              <br/>
              <h1>Adopter Log In Form:</h1>
              <LoginAdopter/>
              <br/>
            </div>
          )
      case "adopter sign up":
          return (
            <div>
              <HeaderSplash handleMenuItemClick={this.handleMenuItemClick}/>
              <br/>
              <h1>Adopter Sign Up Form:</h1>
              <SignupAdopter/>
              <br/>
            </div>
          )
      default:
        return (
          <div>
            <HeaderSplash handleMenuItemClick={this.handleMenuItemClick}/>
            I am the landing page. Eventually I will have a giant image and a header and a logo and shit. For now I have some buttons.
            <h1>Did this work?</h1>
      
          </div>
        )
    } //end of switch
    
  }

}

export default Splash

 // handleClick = (e) => {
  //   console.log(e.target.name)
  //   this.setState({
  //     formType: e.target.name
  //   })
  // }

  // adminLoginButton = () => <button name="admin log in" onClick={this.handleClick}>Admin Log In</button>
  // adopterLoginButton = () => <button name="adopter log in" onClick={this.handleClick}>Adopter Log In</button>
  // adopterSignupButton = () => <button name="adopter sign up" onClick={this.handleClick}>Adopter Sign Up</button>

/* <div>
      I am the landing page. Eventually I will have a giant image and a header and a logo and shit. For now I have some buttons.
      <h1>Did this work?</h1>
      <Link to="/admin/login"><button>Admin Log In</button></Link>
      <Link to="/adopter/login"><button>Adopter Log In</button></Link>
      <Link to="/adopter/signup"><button>Adopter Sign Up</button></Link>
      <br/>

      Route vs conditional rendering of the form components. routes makes the routes available for the user to type into the browser and maybe makes it easier for me to see what form i'm on???. Rendering without routes means everything will be in '/' and controlled by state which is the more reacty way to do it. Also, I want to have the thing where if a user isn't logged in, they can't access any route other than '/'

      I also tried using Switch and it...didn't work
      
        <Route path="/admin/login" render={(routerProps) => <LoginAdmin {...routerProps}/>} />
        <Route path="/adopter/login" render={(routerProps) => <LoginAdopter {...routerProps}/>}/>
        <Route path="/adopter/signup" render={(routerProps) => <SignupAdopter {...routerProps}/>}/>
     
      <img alt="worlds cutest dog" src={rubyURL}/>

    </div> */