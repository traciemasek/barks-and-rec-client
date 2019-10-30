import React from 'react'

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

  render() {
    const { username, password } = this.state
    return(
    <form>
      <label>Username:</label>
      <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
      <label>Password:</label>
      <input type="text" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
    </form>
    )
  }

}

export default LoginAdopter