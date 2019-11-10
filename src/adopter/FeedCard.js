import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Feed, Card } from 'semantic-ui-react'
import FeedItem from './FeedItem'

class FeedCard extends Component {

 
  renderFeedItems = () => {
    const { adopterNotifications } = this.props
    const unreadNotifications = adopterNotifications.filter(notification => !notification.read)
    return unreadNotifications.map(note => <FeedItem key={note.id} notification={note} />)
  }


  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Notifications</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {this.renderFeedItems()}
          </Feed>
        </Card.Content>
      </Card>
    )
  }
}

function msp(state){
  return {
    adopterNotifications: state.adopterNotifications
  }
}

export default connect(msp)(FeedCard)



/* <Feed.Event>
              <Feed.Label icon='file alternate outline' />
              <Feed.Content>
                <Feed.Date content='1 day ago' />
                <Feed.Summary>
                  You added Jenny Hess to your coworker group.
                
                </Feed.Summary>
                <Feed.Meta onClick={this.removeNotification}>
                  <Feed.Like>
                    <Icon name='delete' />Mark as read
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label icon='file alternate outline' />
              <Feed.Content>
                <Feed.Date content='3 days ago' />
                <Feed.Summary>
                  You added Molly Malone as a friend.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label icon='file alternate outline' />
              <Feed.Content>
                <Feed.Date content='4 days ago' />
                <Feed.Summary>
                  You added Elliot Baker to your musicians group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event> */
