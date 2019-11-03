import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../actions.js'

class HeaderAdopter extends Component {
  state = { activeItem: 'dashboard' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout = () => {
    console.log("logging out")
    this.props.logout()
    localStorage.removeItem("token")
    this.props.history.push("/")
  }

  userMenu = () => {
    console.log("someday this will be a dropdown with options to edit profile and maybe log out")
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted attached>
        <Menu.Item
          as={Link} to='/adopter/'
          name='dashboard'
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        />
        <Menu.Item 
          as={Link} to='/adopter/dogs'
          name='adoptable dogs'
          active={activeItem === 'adoptable dogs'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/adopter/faves'
          name='my faves'
          active={activeItem === 'my faves'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/adopter/application'
          name='application'
          active={activeItem === 'application'}
          onClick={this.handleItemClick}
        />
        {this.props.user && !this.props.admin ? 
        <>
         <Menu.Item
        //  as={Link} to='/adopter/application'
        //make this a drop down with options 
         icon="user circle outline"
         name={this.props.user.username}
         active={activeItem === 'log out'}
         onClick={this.userMenu}
       />
         <Menu.Item
        //  as={Link} to='/adopter/application'
         name='log out'
         onClick={this.logout}
       />
       </>
        : null }
      </Menu>
    )
  }
}

function msp(state){
  return {
    user: state.user,
    admin: state.admin
  }
}



export default withRouter(connect(msp, { logout })(HeaderAdopter))