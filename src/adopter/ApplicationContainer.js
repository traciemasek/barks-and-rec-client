import React, { Component } from 'react'
import ApplicationForm from './ApplicationForm'
import ApplicationStatus from './ApplicationStatus'
import { Grid, Segment } from 'semantic-ui-react'

class ApplicationContainer extends Component {

  //would be awesome to start with instructions and a step/button/card that says Apply! Submit Your Application exactly like the first step in the group. Clicking that should render the application. Once the application has been submitted, only the checklist should show
  render() {
    return (
      <>
      <Grid centered>
        <Segment basic>
          <Segment basic padded key={"big"} size={"big"}>
            Apply to adopt!
          </Segment>
        </Segment>
        
      </Grid>
      <br/>
      <Grid centered>
        <ApplicationForm/>
       
        <ApplicationStatus/>
      </Grid>
        
      </>
    )
  }
}

export default ApplicationContainer 

