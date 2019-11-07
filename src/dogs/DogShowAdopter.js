import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Segment, Header } from 'semantic-ui-react'

class DogShow extends Component {
  render() {
    if (this.props.dogs.length > 0) {
      // console.log("DOG SHOW PROPS", this.props)
      // let dogId = parseInt(this.props.match.params.id)
      // console.log("dog id", dogId)
      let dogId = parseInt(this.props.dogId)
  
      let foundDog = this.props.dogs.find(dog=>dog.id === dogId)
      let { age, age_group, name, img1, breed, description, size, weight, dog_friendly, kid_friendly ,cat_friendly, has_special_needs, sex } = foundDog
      const style= {
        textTransform: "capitalize",
        color: "DimGray"
      }
    
      return (
        <Grid centered >
          <Grid.Row></Grid.Row>
          <Grid.Column width={8}>
            <Image rounded alt="" src={img1} />
          </Grid.Column>
          <Grid.Column  width={8}>
            <Header style={{paddingBottom: "6px"}}
              as="h1"
              size="huge" 
              dividing
              content={name}
              subheader={breed}>
            </Header>
            <Segment
              size="large" 
              vertical style={style}> {age_group} • {sex} • {size}
            </Segment>
      
            
          <Grid.Row>
          <Grid.Row></Grid.Row>
          <Header color="grey"size="medium">About</Header>

          <ul>
            <li>Age: {age}, {age_group}</li>
            <li>Weight: {weight} pounds, {size}</li>
            <li>Breed: {breed}</li>
            <li>Description: {description}</li>
            <li>Special needs?: {has_special_needs ? <span aria-label="yes" role="img">✅</span> : <span role="img" aria-label="no">🚫</span>}</li>
            <li>Dog-friendly?: {dog_friendly ? <span role="img" aria-label="yes">✅</span> : <span role="img" aria-label="no">🚫</span>}</li>
            <li>Kid-friendly?: {kid_friendly ? <span role="img" aria-label="yes">✅</span> : <span role="img" aria-label="no">🚫</span>}</li>
            <li>Cat-friendly?: {cat_friendly ? <span role="img" aria-label="yes">✅</span> : <span role="img" aria-label="no">🚫</span>}</li>
          </ul>
          </Grid.Row>
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
    dogs: state.dogs
  }
}
export default connect(msp)(DogShow)
