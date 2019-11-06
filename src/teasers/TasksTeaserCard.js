import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card } from 'semantic-ui-react'

function TasksTeaserCard(props) {

  return (
    <Card as={Link} to='/admin/tasks'>
      <Image src='https://www.chatelaine.com/wp-content/uploads/2012/09/4497262548baa3060de05e07fb17-660x627.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>To Do</Card.Header>
        <Card.Description>
          Pending adopter application tasks
        </Card.Description>
      </Card.Content>
    </Card>
  )
}


export default TasksTeaserCard