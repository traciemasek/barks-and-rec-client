import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

function ApplicationTeaserCard(props) {
  // if (!props.userLoading) {

  //   console.log(props.adopterApplication)
  // }
  return (
    <Card raised as={Link} to='/adopter/application'>
      <Image src='https://www.greatriverrescue.com/wp-content/uploads/2015/10/pet-friendly-search.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Application</Card.Header>
      
      {props.adopterApplication 
      ? 
        <Card.Description>
          Check the status of your application
        </Card.Description>
      :
        <Card.Description>
          Apply to adopt a dog!
        </Card.Description>
      }
      </Card.Content>
    </Card>
  )
  
}

function msp(state){
  return {
    // user: state.user,
    // userLoading: state.userLoading,
    adopterApplication: state.adopterApplication
  }
}


export default connect(msp)(ApplicationTeaserCard)