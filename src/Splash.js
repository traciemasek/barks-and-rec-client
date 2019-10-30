import React from 'react';
import LoginAdmin from "./forms/LoginAdmin"
import LoginAdopter from "./forms/LoginAdopter"
import SignupAdopter from "./forms/SignupAdopter"
// import { Route, Switch, Link } from "react-router-dom"

// let rubyURL = "https://lh3.googleusercontent.com/cITOnK2PxBKYlVWIA7DAOLTqUbZmbJ3qvRfBt_hKvc4nKWw-TawUNgMefw2zbVWXpYSmiEIxP0dgP7rlMMmXL6pgmqH959UyDAdDSFy52WLN9HIsbQDpryc_4kEewnbRFrWCoburAqo=s764-no"

class Splash extends React.Component {
  //?????
  //will i need to setState back to null at any point?

  state = {
    formType: null
  }

  handleAdminLogin = () => {

  }

  handleClick = (e) => {
    console.log(e.target.name)
    this.setState({
      formType: e.target.name
    })
  }

  adminLoginButton = () => <button name="admin" onClick={this.handleClick}>Admin Log In</button>
  adopterLoginButton = () => <button name="adopterLogin" onClick={this.handleClick}>Adopter Log In</button>
  adopterSignupButton = () => <button name="adopterSignup" onClick={this.handleClick}>Adopter Sign Up</button>



  
  //ultimately, I don't think I want routes bc I don't want the user to be able to go directly to any of these log in paths
  //should use state to conditionally render the form components instead upon button click
  //the case statement is gnarly; is there anyway to make this better? (Would probably need a ternary since JSX requires expressions)
  //maybe once I have the header and image as separate components it'll be better??
  render() {
    // console.log("SPLASH state", this.state)
    switch (this.state.formType) {
      case "admin":
          return (
            <div>
              I am the landing page. Eventually I will have a giant image and a header and a logo and shit. For now I have some buttons.
              <br/>
              {this.adopterLoginButton()}
              {this.adopterSignupButton()}
              <h1>Admin Log In Form:</h1>
              <LoginAdmin/>
              <br/>
              {/* <img alt="worlds cutest dog" src={rubyURL}/> */}
            </div>
          )
      case "adopterLogin":
          return (
            <div>
              I am the landing page. Eventually I will have a giant image and a header and a logo and shit. For now I have some buttons.
              <br/>
              {this.adminLoginButton()}
              {this.adopterSignupButton()}
              <h1>Adopter Log In Form:</h1>
              <LoginAdopter/>
              <br/>
              {/* <img alt="worlds cutest dog" src={rubyURL}/> */}
            </div>
          )
      case "adopterSignup":
          return (
            <div>
              I am the landing page. Eventually I will have a giant image and a header and a logo and shit. For now I have some buttons.
              <br/>
              {this.adminLoginButton()}
              {this.adopterLoginButton()}
              <h1>Adopter Sign Up Form:</h1>
              <SignupAdopter/>
              <br/>
              {/* <img alt="worlds cutest dog" src={rubyURL}/> */}
            </div>
          )
      default:
        return (
          <div>
            I am the landing page. Eventually I will have a giant image and a header and a logo and shit. For now I have some buttons.
            <h1>Did this work?</h1>
            {this.adminLoginButton()}
            {this.adopterLoginButton()}
            {this.adopterSignupButton()}
            <br/>
          
            {/* <img alt="worlds cutest dog" src={rubyURL}/> */}
      
          </div>
        )
    }
  }

}

export default Splash

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