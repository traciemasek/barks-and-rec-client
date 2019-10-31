import React, { Component } from 'react';
import DogCard from './DogCard';
// import DogShow from './DogShow';
// import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { Switch, Route } from 'react-router-dom';

class DogsContainer extends Component {

  // state = {
  //   loading: true
  // }

  // componentDidMount() {
  //   this.props.fetchDogs()
  //   .then(() => {
  //      this.setState({
  //         loading: false
  //       });
  //   })
  // }

  //figure out the filter/search shit


  renderDogs = () => {
    return this.props.dogs.map(dog=><DogCard key={dog.id} dog={dog}/>)
  }

  render() {
    console.log("DOG CONTAINER PROPS", this.props)
    // if (this.state.loading) {
    //   return <Loader active inline='centered' />
    // }

    return (
      <div>
        <p>Need to fix the grid and make the heart clickable (which will actually happen on the card</p>
          {/* {this.renderDogs()} */}
        <p>Clicking on the card should route to and render to the individual dog's show page</p>

        <p>Remember to change the loader functionality after you get redux and thunk and all that fully set up</p>
        
        {this.renderDogs()}
        
      </div>
    )
  }
}

function msp(state) {
  return (
    {dogs: state.dogs}
  )
}

export default connect(msp)(DogsContainer)