import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdoptersCard from './AdoptersCard'
import { Segment } from 'semantic-ui-react'

class AdoptersContainer extends Component {

  renderAdopters = () =>{
    return this.props.adopters.map(adopter => <AdoptersCard key={adopter.id} adopter={adopter}/>)
  }

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <Segment>THIS LOOKS EXACTLY HOW I WANT DON'T WORRY ABOUT IT</Segment>
        {this.renderAdopters()}
      </div>
    )
  }
}

function msp(state) {
  return {
    adopters: state.adopters
  }
}

export default connect(msp)(AdoptersContainer)