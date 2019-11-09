import React, { Component } from 'react'
import { Modal, Menu, Sticky, Segment } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SignupAdopter from '../forms/SignupAdopter'
import LoginAdopter from '../forms/LoginAdopter'
import LoginAdmin from '../forms/LoginAdmin'

class HeaderSplash extends Component {
  state = { 
    activeItem: 'dashboard' ,
    
  }

  handleItemClick = (e, { name }) => {
    // console.log("name from menu item", name)
    // this.props.handleMenuItemClick(name)
    this.setState({ 
      activeItem: name,
    })
    }

  render() {
    const { activeItem } = this.state
    return (
      <Sticky>
      <Segment inverted attached >
      <Menu inverted secondary borderless size="large">
        <Modal 
          dimmer='blurring'
          size="mini" 
          trigger={<Menu.Item
          name='admin log in'
          active={activeItem === 'admin log in'}
          onClick={this.handleItemClick}
        />}>
          <Modal.Header>Admin Log In!</Modal.Header>
          <Modal.Content>
            <LoginAdmin />
          </Modal.Content>
        </Modal>

        <Modal 
          dimmer='blurring'
          size="mini" 
          trigger={<Menu.Item 
          name='adopter log in'
          active={activeItem === 'adopter log in'}
          onClick={this.handleItemClick}
        />}>
          <Modal.Header>Adopter Log In!</Modal.Header>
          <Modal.Content>
            <LoginAdopter />
          </Modal.Content>
        </Modal>

        <Modal 
          dimmer='blurring'
          size="mini" 
          trigger={<Menu.Item
          name='adopter sign up'
          active={activeItem === 'adopter sign up'}
          onClick={this.handleItemClick}
        />}>
          <Modal.Header>Sign up!</Modal.Header>
          <Modal.Content>
            <SignupAdopter />
          </Modal.Content>
        </Modal>
      </Menu>
      </Segment> 
      </Sticky>
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