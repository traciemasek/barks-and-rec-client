import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card } from 'semantic-ui-react'

function FavoriteDogsTeaserCard(props) {

  return (
    <Card raised as={Link} to='/adopter/faves'>
      <Image src='https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2016/02/12195750/havenese_with_heart_1.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Favorite Dogs</Card.Header>
        <Card.Description>
          Which dogs do you have your eye on?
        </Card.Description>
      </Card.Content>
    </Card>
  )
  
}

export default FavoriteDogsTeaserCard