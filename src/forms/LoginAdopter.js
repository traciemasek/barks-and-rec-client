import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form } from 'semantic-ui-react'

class LoginAdopter extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    fetch("http://localhost:3001/api/v1/adopter_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        //adopter params needs to be nested for adopter_params to work in Rails
        adopter: {
          username: this.state.username,
          password: this.state.password
        }
      })
    })
    .then(resp => resp.json())
    .then(response => {
      console.log("ADOPTER LOG IN RESPONSE", response)
      if (response.exception === "#<NoMethodError: undefined method `authenticate' for nil:NilClass>") {
        alert("User doesn't exist")
      } else if (response.errors){
        alert(response.errors)
      } else {
        this.props.setUser(response.adopter)
        localStorage.token = response.token
        this.props.history.push("/adopter")
      }
    })
  }


  render() {
    const { username, password } = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input required fluid label='Username' name='username' placeholder='username' onChange={this.handleChange} value={username}/>
        <Form.Input required fluid label='Password' name='password' placeholder='Password' type="password" onChange={this.handleChange} value={password}/>
        
        <Form.Button color="instagram">Log In</Form.Button>
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

function mdp(dispatch){
  return {
    setUser: adopter => {
      dispatch({type: "SET_ADOPTER_USER", payload: adopter})
    }
  }
}

export default withRouter(connect(msp, mdp)(LoginAdopter))