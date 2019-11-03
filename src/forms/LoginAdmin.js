import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


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
      <form onSubmit={this.handleSubmit}>
        <label>Admin Username:</label>
        <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
        <label>Password:</label>
        <input type="text" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
        <input type="submit" value="Log In"/>
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

function mdp(dispatch){
  return {
    setUser: admin => {
      dispatch({type: "SET_ADMIN_USER", payload: admin})
    }
  }
}

export default withRouter(connect(msp, mdp)(LoginAdmin))