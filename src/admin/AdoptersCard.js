import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import images from '../dog_avatars/dogImages'

function AdoptersCard(props) {
 
  console.log("ADOPTER CARD PROPS", props.adopter.application)
  const { username, first_name, last_name, dogs, application } = props.adopter
  const fullName = `${first_name} ${last_name}`
  const metaName = `@${username}`
  const image = images[Math.floor(Math.random()*images.length)]
  const favoriteDogs = dogs.map(dog => dog.name)

  let applicationStatus

    if (!application){
      applicationStatus = "Not submitted"
    } else if (application.submitted && !application.initial_review) {
      applicationStatus = "Initial review pending"
    } else if (application.initial_review && !application.references) {
      applicationStatus = "Reference check pending"
    } else if (application.references && !application.home_visit) {
      applicationStatus = "Home visit pending"
    } else if (application.home_visit && !application.final_approval) {
      applicationStatus = "Final approval pending"
    } else if (application.final_approval) {
      applicationStatus = "Approved to adopt!"
    }
  

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
          {first_name} is interested in adopting: {dogs.length > 0 ?  
          <strong> {favoriteDogs.join(" • ")}</strong> : "No favorites yet"}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name={application && application.final_approval ? "clipboard check" : "wpforms" }></Icon>
          Application Status: {applicationStatus}
        </div>
      </Card.Content>
    </Card>

    </>
  )
}


export default connect()(AdoptersCard)