import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../actions.js'

class HeaderAdmin extends Component {
  //want to move this state and functionality to redux store to keep it with reload, which not that I think about it probably still won't work bc reload would reset the redux store too i think. it would have to be in localStorage or derive value from the url
  state = { activeItem: 'dashboard' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout = () => {
    console.log("logging out")
    this.props.logout()
    localStorage.removeItem("token")
    this.props.history.push("/")
  }

  userMenu = () => {
    console.log("someday this will be a dropdown whatever options an admin might want")
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted attached >
        <Menu.Item name='ADMIN' />
        <Menu.Item
          as={Link} to='/admin/'
          name='dashboard'
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        />
        <Menu.Item 
          as={Link} to='/admin/dogs'
          name='dogs'
          active={activeItem === 'dogs'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/admin/adopters'
          name='adopters'
          active={activeItem === 'adopters'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/admin/tasks'
          name='tasks'
          active={activeItem === 'tasks'}
          onClick={this.handleItemClick}
        />
         {this.props.user && this.props.admin ? 
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
         name='admin log out'
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


export default withRouter(connect(msp, { logout })(HeaderAdmin))