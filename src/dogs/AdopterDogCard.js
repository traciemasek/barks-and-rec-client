import React, { Component } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
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
    const {img1, name, id, breed, age_group, sex } = this.props.dog
    const favorite = this.props.favorite
    const style= {
      textTransform: "capitalize"
    }
    let genderIcon = sex === "female" ? "venus" : "mars"

    return (
    favorite 
    ?
      <Card raised>
        <Image fluid src={img1} wrapped ui={false} as={Link} to={`/adopter/dogs/${id}`}/>
        <Card.Content as={Link} to={`/adopter/dogs/${id}`}>
          <Card.Header>{name}</Card.Header>
          <Card.Meta 
            style={style}>
            {breed}  
            <Icon name={genderIcon} /> 
             {age_group}
          </Card.Meta>
        </Card.Content>
        
        <Card.Content extra>
          <Button color="red" onClick={this.removeFavorite}>
            <Button.Content>
              <Icon name={'heart'} />Favorite 
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>
    :
    <Card raised>
      <Image fluid src={img1} wrapped ui={false} as={Link} to={`/adopter/dogs/${id}`}/>
      <Card.Content as={Link} to={`/adopter/dogs/${id}`}>
        <Card.Header>{name}</Card.Header>
        <Card.Meta 
            style={style}>
            {breed}  
            <Icon name={genderIcon} /> 
             {age_group}
          </Card.Meta>
      </Card.Content>
      <Card.Content extra>

        <Button basic color="red" animated="fade" onClick={this.createFavorite}>
          <Button.Content visible>Add to favorites</Button.Content>
          <Button.Content hidden>
            <Icon name='heart' />
          </Button.Content>
        </Button>

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
