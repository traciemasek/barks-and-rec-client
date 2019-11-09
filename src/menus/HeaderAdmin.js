import React, { Component } from 'react'
import { Menu, Label, Segment, Sticky } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../actions.js'

class HeaderAdmin extends Component {
  //want to move this state and functionality to redux store to keep it with reload, which not that I think about it probably still won't work bc reload would reset the redux store too i think. it would have to be in localStorage or derive value from the url
  state = { activeItem: '' }

  componentDidMount(){
    // console.log("header props", this.props.location.pathname)
    let location = this.props.location.pathname
    switch (location){
      case "/admin/dogs":
        this.setState({activeItem: 'dogs'})
        break;
      case "/admin/adopters":
        this.setState({activeItem: 'adopters'})
        break;
      case "/admin/tasks":
        this.setState({activeItem: 'tasks'})
        break;
      default:
        this.setState({activeItem: 'dashboard'})
    }
  }

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
    let incompleteTasks = this.props.tasks.filter(task => !task.complete)
  
    return (
    <Sticky>
    <Segment inverted attached >
      <Menu inverted secondary borderless size="large">
        <Menu.Item
          as={Link} to='/admin/'
          name='ADMIN Dashboard'
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
        {incompleteTasks.length > 0 ? 
        <Menu.Item
          as={Link} to='/admin/tasks'
          name='tasks'
          active={activeItem === 'tasks'}
          onClick={this.handleItemClick}>
            Tasks <Label color='red' floating>
              {incompleteTasks.length}
            </Label>
          </Menu.Item>
          :
          <Menu.Item
          as={Link} to='/admin/tasks'
          name='tasks'
          active={activeItem === 'tasks'}
          onClick={this.handleItemClick}>
          </Menu.Item>
         }   
         {this.props.user && this.props.admin ? 
        <>
         <Menu.Item position="right"
        //make this a drop down with options 
         icon="user circle outline"
         name={this.props.user.username}
         active={activeItem === 'log out'}
         onClick={this.userMenu}
       />
         <Menu.Item
         name='admin log out'
         onClick={this.logout}
       />
       </>
        : null }
      </Menu>
      </Segment> 
      </Sticky>
    )
  }
}

function msp(state){
  return {
    user: state.user,
    admin: state.admin,
    tasks: state.tasks
  }
}


export default withRouter(connect(msp, { logout })(HeaderAdmin))