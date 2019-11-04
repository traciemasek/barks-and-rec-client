import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createFavorite } from "../actions"

class AdopterDogCard extends Component {

  handleFavorite = () => {
    console.log("clicking dog id", this.props.dog.id, "user id", this.props.user.id)
    let body = {
      adopter_id: this.props.user.id,
      dog_id: this.props.dog.id
    }
    this.props.createFavorite(body)
    //prepare the body for the post request and call the action from this.props.createFavorite
  }

  render() {
    const {img1, name, id } = this.props.dog
    return (
      <Card >
        <Image src={img1} wrapped ui={false} as={Link} to={`/adopter/dogs/${id}`}/>
        <Card.Content as={Link} to={`/adopter/dogs/${id}`}>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          {/* figure out how to render the icon as red if the dog is in the user's favorites */}
          {/* clicking on this should create favorite and need to conditionally render this based on if the dog is one of the adopter's favorites once i have auth */}
          {/* if already favorited, it should not be clickable to add to favorites, and clicking should REMOVE it */}
          <Icon name="like" onClick={this.handleFavorite}/>
        </Card.Content>
      </Card>
      
    )
  }
}

function msp(state){
  return {
    user: state.user
  }
}

export default connect(msp, { createFavorite })(AdopterDogCard)
