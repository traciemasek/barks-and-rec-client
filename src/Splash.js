import React from 'react';
import HeaderSplash from "./menus/HeaderSplash"
import jumbotrons from './images/jumbotrons'
// import { Container } from 'semantic-ui-react'
// import { Route, Switch, Link } from "react-router-dom"


function Splash (props) {

  const jumbotron = jumbotrons[Math.floor(Math.random()*jumbotrons.length)]

  const style = {
    backgroundImage: `url(${jumbotron})`,
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

export default Splash

