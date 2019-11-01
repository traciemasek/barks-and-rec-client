import React, { Component } from 'react'
import { Container, Form} from 'semantic-ui-react'

class ApplicationForm extends Component {
  render() {
  
    return (
      <div>
        
        <Container text>
          <Form>
          <Form.Group widths='equal'>
            <Form.Input required fluid label='First name' placeholder='First name' />
            <Form.Input required fluid label='Last name' placeholder='Last name' />
          </Form.Group>
          <Form.TextArea label='Why Do You Want to Adopt a Dog?' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button>Submit</Form.Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default ApplicationForm
