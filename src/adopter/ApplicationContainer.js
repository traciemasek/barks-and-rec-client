import React, { Component } from 'react'
import ApplicationForm from './ApplicationForm'
import ApplicationStatus from './ApplicationStatus'
import { Grid, Segment, Header, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ApplicationContainer extends Component {

  //would be awesome to start with instructions and a step/button/card that says Apply! Submit Your Application exactly like the first step in the group. Clicking that should render the application. Once the application has been submitted, only the checklist should show
  render() {
    // console.log("application container props", this.props)
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
                <Header style={{fontFamily: "Roboto"}} as="h1">Check your application status!</Header>
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
            <Header style={{fontFamily: "Roboto"}} as={"h1"}>Congrats! You're approved to adopt!</Header>
            
          </Grid.Row>
          
          <Grid.Row>
          {/* <Image src="https://1p4xnw9vz583g92k7249hwjj-wpengine.netdna-ssl.com/wp-content/uploads/2014/05/Celebrating-Dogs.jpg" rounded centered /> */}
          <Image src="http://www.sandiegopetsmagazine.com/wp-content/uploads/2019/07/dog_party.jpg" rounded centered />
          </Grid.Row>
        </Grid>
      
      }
      </>
      :
      <>
      <Grid centered>
        <Segment basic>
          <Segment basic padded key={"big"} size={"big"}>
            <Header style={{fontFamily: "Roboto"}} as="h1">Submit an application to adopt!</Header>
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

