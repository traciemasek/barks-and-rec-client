import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createFavorite, removeFavorite } from "../actions"

class AdopterDogCard extends Component {

  createFavorite = () => {
    let body = {
      adopter_id: this.props.user.id,
      dog_id: this.props.dog.id
    }
    this.props.createFavorite(body)
  }

  removeFavorite = () => {
    const { id } = this.props.dog
    let favorites = this.props.favorites
    let favorite = favorites.find(favorite => favorite.dog_id === id)
    this.props.removeFavorite(favorite.id)
  }

  render() {
    // console.log("dog card dog props", this.props)
    const {img1, name, id } = this.props.dog
    const favorite = this.props.favorite

    return (
    favorite 
    ?
      <Card raised>
        <Image src={img1} wrapped ui={false} as={Link} to={`/adopter/dogs/${id}`}/>
        <Card.Content as={Link} to={`/adopter/dogs/${id}`}>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name="like" color="red" onClick={this.removeFavorite}/>
        </Card.Content>
      </Card>
    :
    <Card >
      <Image src={img1} wrapped ui={false} as={Link} to={`/adopter/dogs/${id}`}/>
      <Card.Content as={Link} to={`/adopter/dogs/${id}`}>
        <Card.Header>{name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Icon name="like" onClick={this.createFavorite}/>
      </Card.Content>
    </Card>
    )
  }
}

// color="red"

function msp(state){
  return {
    user: state.user, 
    favorites: state.favorites,
    favoriteDogs: state.favoriteDogs
  }
}

export default connect(msp, { createFavorite, removeFavorite })(AdopterDogCard)
