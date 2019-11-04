import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card } from 'semantic-ui-react'

function AdoptableDogsTeaserCard(props) {

  return (
    <Card centered as={Link} to='/adopter/dogs'>
      <Image src='https://www.sciencemag.org/site/extra/dogs/dog-collage.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Adoptable Dogs</Card.Header>
      
        <Card.Description>
          Meet our available dogs!
        </Card.Description>
      </Card.Content>
    </Card>
  )
  
}

export default AdoptableDogsTeaserCard
