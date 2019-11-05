import React, { Component } from 'react';
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createFavorite, removeFavorite } from "../actions"

class AdminDogCard extends Component {

 

  render() {
    // console.log("dog card dog props", this.props)
    const {img1, name, id } = this.props.dog
    let numFaves = this.props.allFavorites.filter(favorite => favorite.dog_id === id).length

    return (
    
      <Card >
        <Image src={img1} wrapped ui={false} as={Link} to={`/admin/dogs/${id}`}/>
        <Card.Content as={Link} to={`/admin/dogs/${id}`}>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Button as='div' labelPosition='right'>
            <Button color='red'>
              <Icon name='heart' />
              Faves
            </Button>
            <Label as='a' basic color='red' pointing='left'>
              {numFaves}
            </Label>
          </Button>
        </Card.Content>
      </Card>
    
    )
  }
}

// color="red"

function msp(state){
  return {
    user: state.user, 
    allFavorites: state.allFavorites
  }
}

export default connect(msp, { createFavorite, removeFavorite })(AdminDogCard)
