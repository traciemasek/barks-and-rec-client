import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class HeaderAdmin extends Component {
  state = { activeItem: 'dashboard' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
      </Menu>
    )
  }
}