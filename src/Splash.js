import React from 'react';
import HeaderSplash from "./menus/HeaderSplash"
import jumbotron02 from './images/jumbotron03.jpeg'
// import { Container } from 'semantic-ui-react'
// import { Route, Switch, Link } from "react-router-dom"


class Splash extends React.Component {
  
  render() {
    // console.log("SPLASH state", this.state)

    const style = {
      // border: "1px solid red",
      backgroundImage: `url(${jumbotron02})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: "100vh"
    }

    return (
      <>
      <div style={style}>
      <HeaderSplash />
      </div>
      </>
    )
  }

}

export default Splash

