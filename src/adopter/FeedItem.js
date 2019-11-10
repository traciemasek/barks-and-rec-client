import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeNotification } from '../actions'
import * as moment from "moment";

function FeedItem(props) {
  const {created_at, message, id} = props.notification

  function renderDate() {
    // return moment(created_at).format("M/D h:mma");
    return moment(created_at).startOf().fromNow()
  }

  function removeNotification() {
    console.log("need to mark the notification read: true")
    props.removeNotification(id)
  }

  function handleClick() {
    props.removeNotification(id)
    //should mark as read AND link to page
    props.history.push("/adopter/application")
  }

  return (
    <Feed.Event >
      <Feed.Label as="a" onClick={handleClick}>
        <Icon size="big" name='file alternate outline' />
      </Feed.Label> 
      <Feed.Content >
        <Feed.Date content={renderDate()} />
        <Feed.Summary as="a" onClick={handleClick} >
          {message}
        
        </Feed.Summary>
        <Feed.Meta onClick={removeNotification}>
          <Feed.Like>
            <Icon name='delete' />Mark as read
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  )

}

export default withRouter(connect(null, { removeNotification })(FeedItem))