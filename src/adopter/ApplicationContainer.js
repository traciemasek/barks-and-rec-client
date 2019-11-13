import React, { Component } from 'react'
import ApplicationForm from './ApplicationForm'
import ApplicationStatus from './ApplicationStatus'
import { Grid, Segment, Header, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ApplicationContainer extends Component {

  render() {
    const { adopterApplication, userLoading } = this.props

    if (userLoading) {
      return (
        <Grid centered>
          <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
        </Grid>
      )
    } else {
    return(
      <>
      <Grid centered>
          <Grid.Row></Grid.Row>
          <Grid.Column width={12}>
      
        {adopterApplication
        ?
        <>
          {!adopterApplication.final_approval 
          ? 
          <>
            <Grid centered>
              <Segment basic>
                <Segment basic padded key={"big"} size={"big"}>
                  <Header style={{fontFamily: "Roboto"}} as="h1">Check your application status!</Header>
                </Segment>
              </Segment>
            </Grid>
            
            <Grid centered>
              <Grid.Row></Grid.Row>
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
          
          <Grid centered>
            <ApplicationForm/>
          </Grid>
        </>
        }
        </Grid.Column>
      </Grid>
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

