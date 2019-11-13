import React, { Component } from 'react';
import { Card, Icon, Image, Button, Modal } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createFavorite, removeFavorite } from "../actions"
import DogShowAdopter from './DogShowAdopter'


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
    const {img1, name, id, breed, age } = this.props.dog
    const { favorite } = this.props
    const style= {
      textTransform: "capitalize"
    }

    return (
  
      <Card raised>
        <Modal size="fullscreen" trigger={<Image fluid src={img1} wrapped ui={false}/>}>
          <Modal.Content>
            <DogShowAdopter favorite={favorite} dogId={id}/>
          </Modal.Content>
        </Modal>
        
        <Modal trigger={<Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta 
            style={style}>
            {breed} • {age}
          </Card.Meta>
        </Card.Content>}>
          <Modal.Content>
            <DogShowAdopter dogId={id}/>
          </Modal.Content>
        </Modal>
        
        <Card.Content extra>
          {favorite ? 
            <Button color="red" onClick={this.removeFavorite}>
              <Button.Content>
                <Icon name={'heart'} />Favorite 
              </Button.Content>
            </Button>
           : 
            <Button basic color="red" animated="fade" onClick={this.createFavorite}>
              <Button.Content visible>Add to favorites</Button.Content>
              <Button.Content hidden>
                <Icon name='heart' />
              </Button.Content>
            </Button>
           }

        </Card.Content>
      </Card>
   
    )
  }
}



function msp(state){
  return {
    user: state.user, 
    favorites: state.favorites,
    favoriteDogs: state.favoriteDogs
  }
}

export default connect(msp, { createFavorite, removeFavorite })(AdopterDogCard)
