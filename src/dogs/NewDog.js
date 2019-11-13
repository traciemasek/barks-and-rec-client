import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Image, Grid, Segment, Header } from 'semantic-ui-react'
import { connect } from "react-redux"
import { createDog } from '../actions'

class NewDog extends Component {
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
    img3: ""
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    e.preventDefault()
    let dogBody = {dog: this.state}
    this.props.createDog(dogBody)
    this.props.history.push("/admin/dogs")
  }
  

  render() {
    console.log("NEW DOG STATE", this.state)

    const sexOptions = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]

    const sizeOptions = [
      { key: 'sm', text: 'Small', value: 'Small' },
      { key: 'md', text: 'Medium', value: 'Medium' },
      { key: 'lg', text: 'Large', value: 'Large' },
      { key: 'xl', text: 'XL', value: 'XL' },
    ]

    const ageOptions = [
      { key: 'puppy', text: 'Puppy', value: 'Puppy' },
      { key: 'young', text: 'Young', value: 'Young' },
      { key: 'adult', text: 'Adult', value: 'Adult' },
      { key: 'senior', text: 'Senior', value: 'Senior' },
    ]

    const housetrainedOptions = [
      { key: 'yes', text: 'Yes', value: 'Yes' },
      { key: 'no', text: 'Working on it', value: 'Working on it' }
    ]

    const { name, breed, sex, size, age, color, houseTrained, goodHome, badHome, health, about, img1, img2, img3 } = this.state
   

    return (
      <Grid centered>
        <Grid.Row></Grid.Row>
        <Grid.Column width={12}>
        <Grid centered >
          <Grid.Row centered>
            <Segment basic>
              <Header style={{fontFamily: "Roboto"}} as={"h1"}>Add a new dog to the database:</Header>
            </Segment>
          </Grid.Row>
        </Grid>
    
          <Form onSubmit={this.handleSubmit}>
            
          <Form.Group widths='equal'>
            <Form.Input required fluid label='Name' name="name" onChange={this.handleChange} placeholder='Name' value={name}/>
            <Form.Input required fluid label='Breed' name="breed"  onChange={this.handleChange} placeholder='Breed' value={breed}/>
            <Form.Input required fluid label='Color' name="color"  onChange={this.handleChange} placeholder='Color' value={color}/>
          </Form.Group>
    

          <Form.Group widths='equal'>
            <Form.Select required fluid label="Size" name="size" onChange={this.handleChange} options={sizeOptions} placeholder="Select..." value={size}>
            </Form.Select>
            <Form.Select required fluid label="Age" name="age" onChange={this.handleChange} options={ageOptions} placeholder="Select..." value={age}>
            </Form.Select>
            <Form.Select required fluid label="Sex" name="sex" onChange={this.handleChange} options={sexOptions} placeholder="Select..." value={sex}>
            </Form.Select>
            <Form.Select required fluid label="House-Trained" name="houseTrained" onChange={this.handleChange} options={housetrainedOptions} placeholder="Select..." value={houseTrained}>
            </Form.Select>
          </Form.Group>


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

          <Form.TextArea label='Health' name="health" placeholder='Any known health issues...' onChange={this.handleChange} value={health}/>
          <Form.TextArea label='Good in a home with' name="goodHome" placeholder='Other dogs, children, cats, etc...' onChange={this.handleChange} value={goodHome}/>
          <Form.TextArea label='Prefers a home without' name="badHome" placeholder='Other dogs, children, cats, etc...' onChange={this.handleChange} value={badHome}/>
          <Form.TextArea label='About' name="about" placeholder='Add a description of the dog...' onChange={this.handleChange} value={about}/>
        
        
          <Form.Button color="instagram">Submit</Form.Button>
        </Form>     
      </Grid.Column>
    </Grid>
    )
  }
}

export default withRouter(connect(null, { createDog })(NewDog))


