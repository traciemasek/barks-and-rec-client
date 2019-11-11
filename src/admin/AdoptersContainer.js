import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdoptersCard from './AdoptersCard'
import { Segment, Card } from 'semantic-ui-react'

function AdoptersContainer(props) {

  function renderAdopters() {
    return props.adopters.map(adopter => <AdoptersCard key={adopter.id} adopter={adopter}/>)
  }

  return (
    <div>
      <br></br>
      <br></br>
      <Segment>THIS LOOKS EXACTLY HOW I WANT DON'T WORRY ABOUT IT</Segment>
      <Card.Group>
      {renderAdopters()}
      </Card.Group>
    </div>
  )
  
}

function msp(state) {
  return {
    adopters: state.adopters
  }
}

export default connect(msp)(AdoptersContainer)