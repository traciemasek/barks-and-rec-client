import React, { Component } from 'react'
import { connect } from 'react-redux'

class DogShow extends Component {
  render() {
    console.log("DOG SHOW PROPS", this.props)
    let dogId = parseInt(this.props.match.params.id)
    console.log("dog id", dogId)

    let foundDog = this.props.dogs.find(dog=>dog.id === dogId)

    return (
      <div>
        This will render an individual dog's show page with more detailed information about them
        Name of the dog I clicked on = {foundDog.name}
      </div>
    )
  }
}
function msp(state){
  return {
    dogs: state.dogs
  }
}
export default connect(msp)(DogShow)
