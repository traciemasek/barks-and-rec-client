import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdoptersCard from './AdoptersCard'

class AdoptersContainer extends Component {

  renderAdopters = () =>{
    return this.props.adopters.map(adopter => <AdoptersCard key={adopter.id} adopter={adopter}/>)
  }

  render() {
    return (
      <div>
        I will render the adopter cards or show
        {this.renderAdopters()}
      </div>
    )
  }
}

function msp(state) {
  return {adopters: state.adopters}
}

export default connect(msp)(AdoptersContainer)