import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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

    fetch("http://localhost:6969/api/v1/adopter_login", {
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
      if (response.exception === "#<NoMethodError: undefined method `authenticate' for nil:NilClass>") {
        alert("User doesn't exist")
      } else if (response.errors){
        alert(response.errors)
      } else {
        this.props.setUser(response)
        localStorage.token = response.token
        this.props.history.push("/adopter")
      }
    })

    //this "works" but just alerts the 500 error, which isn't very good ux
    // .then(resp => {
    //   if (!resp.ok) {
    //     console.log(resp)
    //     throw Error(resp.statusText)
    //   }
    //   return resp.json();
    // }).then(adopter => {
    //   console.log(adopter)
    // }).catch(error => {
    //   alert(error)
    // })
    
  }


  render() {
    const { username, password } = this.state
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
        <label>Password:</label>
        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
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
    setUser: adopter => {
      dispatch({type: "SET_ADOPTER_USER", payload: adopter})
    }
  }
}

export default withRouter(connect(msp, mdp)(LoginAdopter))