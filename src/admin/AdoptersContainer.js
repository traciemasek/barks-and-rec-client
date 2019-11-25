import React from 'react'
import { connect } from 'react-redux'
import AdoptersCard from './AdoptersCard'
import { Header, Card, Grid, Segment } from 'semantic-ui-react'

function AdoptersContainer(props) {

  function renderAdopters() {
    return props.adopters.map(adopter => <AdoptersCard key={adopter.id} adopter={adopter}/>)
  }

  return (
    <Grid centered>
      <Grid.Row></Grid.Row>
      <Grid.Column width={12}>
        
        <Grid>

          <Grid.Row centered>
            <Segment basic>
              <Header as="h1" style={{fontFamily: "Roboto"}} >Our potential adopters</Header>
            </Segment>
          </Grid.Row>

          <Grid.Row></Grid.Row>
          
          <Card.Group stackable itemsPerRow={3} >
          {renderAdopters()}
          </Card.Group>

        </Grid>
      </Grid.Column>
    </Grid>
  )
  
}

function msp(state) {
  return {
    adopters: state.adopters
  }
}

export default connect(msp)(AdoptersContainer)