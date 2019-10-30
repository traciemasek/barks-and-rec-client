import React from 'react'

class SignupAdopter extends React.Component {
  //local state to handle controlled form
  //handle submit will be passed down through props

  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { username, password } = this.state
    return(
    <form>
      <label>Sign up!!!!</label> <br/>
      <label>Username:</label>
      <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
      <label>Password:</label>
      <input type="text" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
      {/* password confirmation input and validation */}
    </form>
    )
  }

}

export default SignupAdopter