import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Header } from 'semantic-ui-react'

class DogShow extends Component {
  render() {
    if (this.props.dogs.length > 0) {

      let dogId = parseInt(this.props.dogId)
  
      let foundDog = this.props.dogs.find(dog=>dog.id === dogId)
      let { age_group, name, img1, breed, description, size, dog_friendly, kid_friendly ,cat_friendly, has_special_needs, sex, special_needs_description } = foundDog

      let subheader = `${breed} • ${age_group} • ${sex} • ${size}`

      // const capitalize = {
      //   textTransform: "capitalize",
      //   // color: "DimGray"
      // }
      const charcoal = {
        color: "#464646"
      }
    
      return (
        <Grid centered >
          <Grid.Row></Grid.Row>
          <Grid.Column width={8}>
            <Image rounded alt="" src={img1} />
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
          <p>Vaccinations up to date; spayed/neutered. Special needs: {has_special_needs ? special_needs_description : "N/A"}</p>

          <Header color="grey" size="medium" content="HOUSE-TRAINED"/>
          <p>Yes</p>

          <Header color="grey" size="medium" content="GOOD IN A HOME WITH"/>
          <p>
            {dog_friendly ? "dogs " : null}
            {cat_friendly ? "cats " : null}
            {kid_friendly ? "children " : null}
          </p>

          <Header color="grey" size="medium" content="PREFERS A HOME WITHOUT"/>
          <p>
            {dog_friendly ? null : "dogs "}
            {cat_friendly ? null : "cats "}
            {kid_friendly ? null : "children"}
          </p>

          <Header style={charcoal} size="large">Meet {name} </Header>
          <p>{description}</p>
  
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
