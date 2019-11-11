import React, { Component } from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import images from '../dog_avatars/dogImages'

function AdoptersCard(props) {
 
  console.log("ADOPTER CARD PROPS", props)
  const { username, first_name, last_name, dogs, application } = props.adopter
  const fullName = `${first_name} ${last_name}`
  const metaName = `@${username}`
  const image = images[Math.floor(Math.random()*images.length)]
  const favoriteDogs = dogs.map(dog => dog.name)

  function applicationStatus(){
    let applicationStatus 

    if (!application){
      applicationStatus = "Not submitted"
    }
    return applicationStatus
  }




  //get application status from application
  //get favorite dogs or "doesn't have any favorites yet"

  return (
    <>
      <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={image}
        />
        <Card.Header>{fullName}</Card.Header>
        <Card.Meta>{metaName}</Card.Meta>
        <Card.Description>
          {first_name} is interested in adopting:  
          <strong> {favoriteDogs.join(" ")}</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name="wpforms"></Icon>
          Application Status: {applicationStatus()}
        </div>
      </Card.Content>
    </Card>

    </>
  )
}


export default connect()(AdoptersCard)