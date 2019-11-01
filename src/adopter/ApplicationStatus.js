import React, { Component } from 'react'
import { Grid, Step } from 'semantic-ui-react'

class ApplicationStatus extends Component {
  state = {
    //figure out how to manage which are active and disabled; set the value to however the attributes for each section evaluate from redux store
  }
  render() {
    const steps = [
      {
        
        key: 'apply',
        active: false,
        disabled: false,
        completed: true,
        icon: 'pencil',
        title: 'Apply!',
        description: 'Submit your application'
      },
      {
        key: 'initial review',
        active: true,
        disabled: false,
        completed: false,
        icon: 'file alternate outline',
        title: 'Inital Review',
        description: "We're reviewing your application"
      },
      { key: 'references', 
        active: false,
        disabled: true, 
        completed: false,
        icon: 'ordered list', 
        title: 'References',
        description: "We're checking your references"
      },
      { key: 'home visit', 
        active: false,
        disabled: true, 
        completed: false,
        icon: 'home', 
        title: 'Home Visit',
        description: "Home visit scheduled"
      },
      { key: 'final approval', 
        active: false,
        disabled: true, 
        completed: false,
        icon: 'clipboard check', 
        title: 'Final Approval',
        description: "You're approved to adopt!"
      },
    ]
    return (
      <Grid centered>
        <Step.Group vertical items={steps} />
      </Grid>
    )
  }
}

export default ApplicationStatus