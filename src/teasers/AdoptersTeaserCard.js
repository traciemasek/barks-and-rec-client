import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card } from 'semantic-ui-react'

function AdoptersTeaserCard(props) {

  return (
    <Card centered as={Link} to='/admin/adopters'>
      <Image src='https://news.orvis.com/images/02-dogs/2017/08-aug/shelter.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Adopters</Card.Header>
        <Card.Description>
          See a list of people who have applied to adopt
        </Card.Description>
      </Card.Content>
    </Card>
  )
}



export default AdoptersTeaserCard