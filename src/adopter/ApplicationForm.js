import React, { Component } from 'react'
import { Container, Form} from 'semantic-ui-react'

class ApplicationForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    why_adopt: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let application = {
      //adopter is stubbed, will need to change to the id of the logged in adopter once auth is set up
      adopter_id: 1,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      why_adopt: this.state.why_adopt
    }
    fetch("http://localhost:6969/api/v1/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(application)
    })
    .then(resp => resp.json())
    .then(console.log)

    this.setState({
      first_name: "",
      last_name: "",
      why_adopt: ""
    })
  }

  render() {
    console.log("APPLICATION STATE", this.state)
    return (
      <div>
        
        <Container text>
          <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input required fluid label='First name' name='first_name' placeholder='First name' onChange={this.handleChange} value={this.state.first_name}/>
            <Form.Input required fluid label='Last name' name='last_name' placeholder='Last name' onChange={this.handleChange} value={this.state.last_name}/>
          </Form.Group>
          <Form.TextArea required label='Why Do You Want to Adopt a Dog?' placeholder='Tell us more about why you want to adopt a dog...' name='why_adopt' value={this.state.why_adopt} onChange={this.handleChange}/>
        {/* <Form.Checkbox required label='I agree to the Terms and Conditions' /> */}
        <Form.Button>Submit</Form.Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default ApplicationForm
