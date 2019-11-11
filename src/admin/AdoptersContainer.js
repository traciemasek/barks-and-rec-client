import React from 'react'
import { connect } from 'react-redux'
import AdoptersCard from './AdoptersCard'
import { Header, Card } from 'semantic-ui-react'

function AdoptersContainer(props) {

  function renderAdopters() {
    return props.adopters.map(adopter => <AdoptersCard key={adopter.id} adopter={adopter}/>)
  }

  return (
    <div>
      <br></br>
      <br></br>
      <Header as="h1" style={{fontFamily: "Roboto"}} >Our potential adopters</Header>
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