import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

function AdoptableDogsTeaserCard(props) {

  return (
  !props.userLoading && props.admin
  ?
  (
    <Card centered as={Link} to='/admin/dogs'>
      <Image src='https://www.sciencemag.org/site/extra/dogs/dog-collage.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Adoptable Dogs</Card.Header>
      
        <Card.Description>
          See all dogs currently available for adoption
        </Card.Description>
      </Card.Content>
    </Card>
  )
  :
   (
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
  )
}

function msp(state){
  return {
    admin: state.admin,
    userLoading: state.userLoading
  }
}

export default connect(msp)(AdoptableDogsTeaserCard)
