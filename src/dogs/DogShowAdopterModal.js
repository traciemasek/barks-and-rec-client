import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Header, Button, Segment, Card } from 'semantic-ui-react'

// AM I ACTUALLY USING THIS??? OR JUST THE OTHER SHOW COMPONENT?

class DogShow extends Component {
  state = {
    image: ""
  }

  setImage = (img) => {
    this.setState({image: img})
  }

  render() {
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
        <Grid centered >
          <Grid.Row></Grid.Row>
          <Grid.Column centered width={8}>
          <Card fluid>
            <Image fluid rounded alt="" src={this.state.image? this.state.image : img1} />
            <Card.Content extra textAlign="center">
            <Segment basic textAlign="center">
            <Button.Group compact size="tiny">
              {imageDots}
            </Button.Group>
            </Segment>
            </Card.Content>
            </Card>
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
      )  
    } else {
      return (
        <Grid centered>
          <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
        </Grid>
      )
      }
    } 
      
    
  
}
function msp(state){
  return {
    dogs: state.dogs
  }
}
export default connect(msp)(DogShow)
