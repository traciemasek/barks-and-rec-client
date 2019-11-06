import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAdopter } from '../actions'

class SignupAdopter extends React.Component {
  state = {
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

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
    const { username, password, passwordConfirmation } = this.state
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Sign up!!!!</label> <br/>
        <label>Username:</label>
        <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
        <label>Password:</label>
        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
        <label>Password Confirmation:</label>
        <input type="password" name="passwordConfirmation" placeholder="Password confirmation" value={passwordConfirmation} onChange={this.handleChange}/>
        <input type="submit" value="Sign up"/>
      </form>
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