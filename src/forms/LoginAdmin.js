import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form } from 'semantic-ui-react'

class LoginAdmin extends React.Component {
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

    fetch("http://localhost:6969/api/v1/admin_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        //adopter params needs to be nested for adopter_params to work in Rails
        admin: {
          username: this.state.username,
          password: this.state.password
        }
      })
    })
    .then(resp => resp.json())
    .then(response => {
      console.log("ADMIN LOG IN RESPONSE", response)
      if (response.exception === "#<NoMethodError: undefined method `authenticate' for nil:NilClass>") {
        alert("Admin user doesn't exist")
      } else if (response.errors){
        alert(response.errors)
      } else {
        this.props.setUser(response.admin)
        localStorage.token = response.token     
        this.props.history.push("/admin")
      }
    })
  }

  render() {
    // console.log("LoginAdmin state", this.state)
    const { username, password } = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input required fluid label='Admin Username' name='username' placeholder='username' onChange={this.handleChange} value={username}/>
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
    setUser: admin => {
      dispatch({type: "SET_ADMIN_USER", payload: admin})
    }
  }
}

export default withRouter(connect(msp, mdp)(LoginAdmin))