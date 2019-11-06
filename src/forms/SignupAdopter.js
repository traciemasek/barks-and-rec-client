import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAdopter } from '../actions'
import { Form } from 'semantic-ui-react'

class SignupAdopter extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //ask steven for help refactoring this with the promise return in actions
  handleSubmit = e => {
    e.preventDefault()
    if (this.state.password === this.state.passwordConfirmation) {
      fetch("http://localhost:6969/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json"
        },
        body: JSON.stringify({
      //adopter params needs to be nested for adopter_params to work in Rails
          adopter: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            password: this.state.password
          }
        })
      })
      .then(resp => resp.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.props.setAdopter(response.adopter)
          localStorage.token = response.token
          this.props.history.push("/adopter")
        }
      })
    } else {
      alert("Passwords don't match")
    }
  }

 

  render() {
    const { first_name, last_name, username, password, passwordConfirmation } = this.state
    return(

      <Form onSubmit={this.handleSubmit}>
        {/* <Form.Group widths='equal'> */}
        <Form.Input required fluid label='First name' name='first_name' placeholder='First name' onChange={this.handleChange} value={first_name}/>
        <Form.Input required fluid label='Last name' name='last_name' placeholder='Last name' onChange={this.handleChange} value={last_name}/>
        <Form.Input required fluid label='Username' name='username' placeholder='username' onChange={this.handleChange} value={username}/>
        <Form.Input required fluid label='Password' name='password' placeholder='Password' type="password" onChange={this.handleChange} value={password}/>
        <Form.Input required fluid label='Password Confirmation' name='passwordConfirmation' placeholder='Password' type="password" onChange={this.handleChange} value={passwordConfirmation}/>
        {/* </Form.Group> */}
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }

}

function msp(state){
  return {
    user: state.user,
    admin: state.admin
  }
}


export default withRouter(connect(msp, { setAdopter })(SignupAdopter))