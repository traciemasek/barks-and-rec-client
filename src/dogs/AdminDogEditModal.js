import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Grid, Image, Header } from 'semantic-ui-react'
import { updateDog } from '../actions'

class DogShow extends Component {
  state = {
    name: "",
    breed: "",
    color: "",
    sex: "",
    size: "",
    age: "",
    houseTrained: "",
    health: "",
    goodHome: "",
    badHome: "",
    about: "",
    img1: "",
    img2: "",
    img3: "",
 
  }

  componentDidMount(){
    const dogId = parseInt(this.props.dogId)
  
    const foundDog = this.props.dogs.find(dog=>dog.id === dogId)
    const { age, name, img1, img2, img3, breed, about, size, health, goodHome, badHome, sex, color, houseTrained } = foundDog

    this.setState({ 
      name,
      breed,
      color,
      sex,
      size,
      age,
      houseTrained,
      health,
      goodHome,
      badHome,
      about,
      img1,
      img2,
      img3
     })

  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  

  handleSubmit = (e) => {
    e.preventDefault()
    let dogBody = {dog: this.state}
    let id = parseInt(this.props.dogId)
    this.props.updateDog(dogBody, id)
    this.props.closeModal()
  }

  render() {
    console.log("edit modal state", this.state)
    if (this.props.dogs.length > 0) {
    
      const { age, name, img1, img2, img3, breed, about, size, health, goodHome, badHome, sex, color, houseTrained } = this.state

      const sexOptions = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
      ]
  
      const sizeOptions = [
        { key: 'sm', text: 'Small', value: 'small' },
        { key: 'md', text: 'Medium', value: 'medium' },
        { key: 'lg', text: 'Large', value: 'large' },
        { key: 'xl', text: 'XL', value: 'XL' },
      ]
  
      const ageOptions = [
        { key: 'puppy', text: 'Puppy', value: 'puppy' },
        { key: 'young', text: 'Young', value: 'young' },
        { key: 'adult', text: 'Adult', value: 'adult' },
        { key: 'senior', text: 'Senior', value: 'senior' },
      ]
  
      const housetrainedOptions = [
        { key: 'yes', text: 'Yes', value: 'Yes' },
        { key: 'no', text: 'Working on it', value: 'Working on it' }
      ]

      const charcoal = {
        color: "#464646"
      }
    
      return (
        
        <Form onSubmit={this.handleSubmit}>
        <Grid centered >
          <Grid.Row></Grid.Row>
          <Grid.Column width={8}>
            <Form.Group widths="equal">
              <Image style={{paddingLeft: "10px"}} src={img1 ? img1 : 'https://react.semantic-ui.com/images/wireframe/square-image.png'} size='tiny' />
              <Form.Input required fluid label='Image URL' name="img1" onChange={this.handleChange} placeholder='http//...' value={img1}/>
            </Form.Group>
            <Form.Group widths="equal">
              <Image style={{paddingLeft: "10px"}} src={img2 ? img2 : 'https://react.semantic-ui.com/images/wireframe/square-image.png'} size='tiny' />
              <Form.Input fluid label='Image URL' name="img2" onChange={this.handleChange} placeholder='http//...' value={img2}/>
            </Form.Group>
            <Form.Group widths="equal">
              <Image style={{paddingLeft: "10px"}} src={img3 ? img3 : 'https://react.semantic-ui.com/images/wireframe/square-image.png'} size='tiny' />
              <Form.Input fluid label='Image URL' name="img3" onChange={this.handleChange} placeholder='http//...' value={img3}/>
            </Form.Group>

            <Header style={charcoal} size="large">Meet {name} </Header>
            <Form.TextArea label='About' name="about" placeholder='Add a description of the dog...' onChange={this.handleChange} value={about}/>

            <Form.Select required fluid label="House-Trained" name="houseTrained" onChange={this.handleChange} options={housetrainedOptions} placeholder="Select..." value={houseTrained}>
            </Form.Select>

          </Grid.Column>

          <Grid.Column  width={8}>
          <Form.Group widths='equal'>
            <Form.Input required fluid label='Name' name="name" onChange={this.handleChange} placeholder='Name' value={name}/>
            <Form.Input required fluid label='Breed' name="breed"  onChange={this.handleChange} placeholder='Breed' value={breed}/>
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Input required fluid label='Color' name="color"  onChange={this.handleChange} placeholder='Color' value={color}/>
            <Form.Select required fluid label="Sex" name="sex" onChange={this.handleChange} options={sexOptions} placeholder="Select..." value={sex}>
            </Form.Select>
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Select required fluid label="Size" name="size" onChange={this.handleChange} options={sizeOptions} placeholder="Select..." value={size}>
            </Form.Select>
            <Form.Select required fluid label="Age" name="age" onChange={this.handleChange} options={ageOptions} placeholder="Select..." value={age}>
            </Form.Select>
          </Form.Group>
            
          <Grid.Row>
      
          <Header style={charcoal} size="large">About</Header>

          <Form.TextArea label='Health' name="health" placeholder='Any known health issues...' onChange={this.handleChange} value={health}/>
        
          <Form.TextArea label='Good in a home with' name="goodHome" placeholder='Other dogs, children, cats, etc...' onChange={this.handleChange} value={goodHome}/>
        
          <Form.TextArea label='Prefers a home without' name="badHome" placeholder='Other dogs, children, cats, etc...' onChange={this.handleChange} value={badHome}/>


          <Form.Button floated="right">Submit Edits</Form.Button>
          </Grid.Row>
          </Grid.Column>                   
        </Grid>
        </Form>
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
export default connect(msp, { updateDog })(DogShow)
