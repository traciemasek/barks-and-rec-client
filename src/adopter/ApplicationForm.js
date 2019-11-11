import React, { Component } from 'react'
import { Container, Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { submitApplication } from '../actions'

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
      adopter_id: this.props.user.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      why_adopt: this.state.why_adopt
    }
    this.props.submitApplication(application)
  }

  render() {
    // console.log("APPLICATION STATE", this.state)
    return (
      <div>
        
        <Container text>
          <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input required fluid label='First name' name='first_name' placeholder='First name' onChange={this.handleChange} value={this.state.first_name}/>
            <Form.Input required fluid label='Last name' name='last_name' placeholder='Last name' onChange={this.handleChange} value={this.state.last_name}/>
          </Form.Group>
          <Form.TextArea required label='Why Do You Want to Adopt a Dog?' placeholder='Tell us more about why you want to adopt a dog...' name='why_adopt' value={this.state.why_adopt} onChange={this.handleChange}/>
        <Form.Button inverted color="instagram">Submit</Form.Button>
          </Form>
        </Container>
      </div>
    )
  }
}

function msp(state){
  return {
    user: state.user
  }
}

export default connect(msp, { submitApplication })(ApplicationForm)
