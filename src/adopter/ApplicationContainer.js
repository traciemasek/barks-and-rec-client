import React, { Component } from 'react'
import ApplicationForm from './ApplicationForm'
import ApplicationStatus from './ApplicationStatus'
import { Grid, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ApplicationContainer extends Component {

  //would be awesome to start with instructions and a step/button/card that says Apply! Submit Your Application exactly like the first step in the group. Clicking that should render the application. Once the application has been submitted, only the checklist should show
  render() {
    console.log("application container props", this.props)
    const { adopterApplication, userLoading } = this.props
    if (userLoading) {
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
    return(
      <>
      {adopterApplication
      ?
      <>
        {!adopterApplication.final_approval ? 
        <>
          <Grid centered>
            <Segment basic>
              <Segment basic padded key={"big"} size={"big"}>
                <h1>Check your application status!</h1>
              </Segment>
            </Segment>
            </Grid>
            <br/>
            <Grid centered>
            <ApplicationStatus/>
          </Grid>
          </>
      :
        <Grid centered>
          <Grid.Row></Grid.Row>
          <Grid.Row>
            <Header as={"h1"}>Congrats! You're approved to adopt!</Header>
          </Grid.Row>
          
          
        </Grid>
      
      }
      </>
      :
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
      </Grid>
      </>
      }
      </>
    )
  } 
  }
}

function msp(state) {
  return {
    user: state.user,
    userLoading: state.userLoading,
    adopterApplication: state.adopterApplication
  }
}

export default connect(msp)(ApplicationContainer )

