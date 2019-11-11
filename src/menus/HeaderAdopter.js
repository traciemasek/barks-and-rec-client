import React, { Component } from 'react'
import { Menu, Segment, Sticky, Icon, Label, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout, addNotification, addFinalNotification } from '../actions.js'
import FeedCard from '../adopter/FeedCard'
import { ActionCableConsumer } from 'react-actioncable-provider';

class HeaderAdopter extends Component {
  state = { activeItem: '' }

  componentDidMount(){
    // console.log("header props", this.props.location.pathname)
    let location = this.props.location.pathname
    switch (location){
      case "/adopter/dogs":
        this.setState({activeItem: 'adoptable dogs'})
        break;
      case "/adopter/faves":
        this.setState({activeItem: 'my faves'})
        break;
      case "/adopter/application":
        this.setState({activeItem: 'application'})
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
    console.log("someday this will be a dropdown with options to edit profile and maybe log out")
  }

  render() {
    const { activeItem } = this.state
    let { adopterNotifications } = this.props
    adopterNotifications = adopterNotifications.filter(note=>!note.read)
    let popupFeed = <FeedCard/>
 
    return (
      <Sticky>
      <Segment inverted attached>
        <Menu inverted secondary borderless size="large">
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
        <Menu.Menu position="right">
        {adopterNotifications.length > 0
        ?
        <>
        <Popup 
          on="click"
          trigger={
            <Menu.Item onClick={()=>console.log("I need this to be a drop down with a feed")}>
              <Icon fitted name="alarm"/>
              <Label color='red' floating>
                  {adopterNotifications.length}
              </Label>
            </Menu.Item>}
          content={popupFeed}
          position="bottom center"
        >
        </Popup>
        </>
        : 
        <Menu.Item>
          <Icon fitted disabled name="alarm"/>
        </Menu.Item>
        }
         <Menu.Item 
        //make this a drop down with options 
         icon="user circle outline"
         name={this.props.user.username}
        //  onClick={this.userMenu}
       />
         <Menu.Item
         name='log out'
         onClick={this.logout}
       />
       </Menu.Menu>
       </>
        : null }


{/* SHOULD THIS BE IN ADOPTER MAIN CONTAINER??? */}
{/* this is messy and might need stream_to so that adopter only gets their own notifications?? */}
      <ActionCableConsumer
        channel={{ channel: 'NotificationChannel' }}
        onReceived={response => {
          console.log("action cable consumer", response);
          if (response.notification.adopter_id === this.props.user.id) {
            response.newTask 
            ?
            this.props.addNotification(response)
            :
            this.props.addFinalNotification(response)
          }
  
        }}
      />

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
    adopterNotifications: state.adopterNotifications
  }
}



export default withRouter(connect(msp, { logout, addNotification, addFinalNotification })(HeaderAdopter))

// addNotification
// may need to remove the add notification logic from the task actions