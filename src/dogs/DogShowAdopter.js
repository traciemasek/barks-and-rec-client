import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createFavorite, removeFavorite } from "../actions"
import { Grid, Image, Header, Button, Icon, Segment } from 'semantic-ui-react'

class DogShow extends Component {
  state = {
    image: ""
  }

  setImage = (img) => {
    this.setState({image: img})
  }

  createFavorite = (id) => {
    let body = {
      adopter_id: this.props.user.id,
      dog_id: id
    }
    this.props.createFavorite(body)
  }

  removeFavorite = (id) => {
    // const { id } = this.props.dog
    let favorites = this.props.favorites
    let favorite = favorites.find(favorite => favorite.dog_id === id)
    this.props.removeFavorite(favorite.id)
  }


  render() {
    const { favorite } = this.props

    if (this.props.dogs.length > 0) {
 
      let dogId = parseInt(this.props.dogId)
  
      let foundDog = this.props.dogs.find(dog=>dog.id === dogId)
      let { age, name, img1, img2, img3, breed, about, size, goodHome, badHome ,health, color, sex, houseTrained } = foundDog

      let subheader = `${breed} • ${age} • ${sex} • ${size} • ${color}`

      const charcoal = {
        color: "#464646"
      }

      let imageArr = [img1, img2, img3]

      let imageDots = imageArr.map((img, i) => {
        if (img) {
          return <Button onClick={()=>this.setImage(img)} key={i} icon>
          <Icon name='circle'/>
        </Button>
        }
      })
    
      return (
        <Grid centered>
          <Grid.Row></Grid.Row>
          <Grid.Column width={12}>

          <Grid centered >
            <Grid.Row></Grid.Row>
            <Grid.Column width={8}>
              <Image fluid rounded alt="" src={this.state.image? this.state.image : img1} />
              <Segment basic textAlign="center">
                  <Button.Group>
                    {imageDots}
                  </Button.Group>
                </Segment>
   {/* FAVORITE BUTTON */}
                <Segment basic textAlign="center">
                {favorite 
                ? 
                  <Button color="red" onClick={()=>this.removeFavorite(dogId)}>
                  <Button.Content>
                    <Icon name={'heart'} />Favorite 
                  </Button.Content>
                  </Button>
                : 
                  <Button basic color="red" animated="fade" onClick={()=>this.createFavorite(dogId)}>
                    <Button.Content visible>Add to favorites</Button.Content>
                    <Button.Content hidden>
                      <Icon name='heart' />
                    </Button.Content>
                  </Button>
                }
                </Segment>


            </Grid.Column>

            <Grid.Column  width={8}>
              <Header style={{paddingBottom: "10px", color: "#464646"}}
                as="h1"
                size="huge" 
                dividing
                content={name}
                subheader={subheader} >
              </Header>
              
            <Grid.Row>
        
            <Header style={charcoal} size="large">About</Header>

            <Header color="grey" size="medium" content="HEALTH"/>
            <p>Vaccinations up to date; spayed/neutered. Special needs: {health ? health : "N/A"}</p>

            <Header color="grey" size="medium" content="HOUSE-TRAINED"/>
            <p>{houseTrained}</p>

            <Header color="grey" size="medium" content="GOOD IN A HOME WITH"/>
            <p>
              {goodHome}
            </p>

            <Header color="grey" size="medium" content="PREFERS A HOME WITHOUT"/>
            <p>
              {badHome}
            </p>

            <Header style={charcoal} size="large">Meet {name} </Header>
            <p>{about}</p>
    
            </Grid.Row>
            </Grid.Column>                   
          </Grid>
        </Grid.Column>
      </Grid>
      )  
    } else {
        return <img alt="loading" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
      }
    } 
      
    
  
}
function msp(state){
  return {
    dogs: state.dogs,
    user: state.user, 
    favorites: state.favorites,
    favoriteDogs: state.favoriteDogs
  }
}
export default connect(msp, { createFavorite, removeFavorite })(DogShow)
