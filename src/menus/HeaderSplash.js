import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class HeaderSplash extends Component {
  state = { 
    activeItem: 'dashboard' ,
    
  }

  handleItemClick = (e, { name }) => {
    // console.log("name from menu item", name)
    this.props.handleMenuItemClick(name)
    this.setState({ 
      activeItem: name,
    })
    }

  render() {
    const { activeItem } = this.state
    // console.log("SPLASH MENU PROPS", this.props)
    return (
      <Menu inverted attached>
        <Menu.Item
          name='admin log in'
          active={activeItem === 'admin log in'}
          onClick={this.handleItemClick}
        />
        <Menu.Item 
          name='adopter log in'
          active={activeItem === 'adopter log in'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='adopter sign up'
          active={activeItem === 'adopter sign up'}
          onClick={this.handleItemClick}
        />
      
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

function mdp(dispatch){
  return {
    logout: () => {
      dispatch({type: "LOGOUT"})
    }
  }
}

export default withRouter(connect(msp, mdp)(HeaderSplash))