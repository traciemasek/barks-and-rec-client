import React, { Component } from 'react'
import { Grid, Step } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ApplicationStatus extends Component {

  render() {
    // console.log("APPLICATION STATUS", this.props.adopterApplication.initial_review)
    const {submitted, initial_review, references, home_visit, final_approval} = this.props.adopterApplication

    // this is all dependent on the tasks being completed in order
    // miiiiight make more sense to either keep everything disabled until complete or make everything active until complete? or find some way to make sure the tasks go in order (chaining their creation based on approval of the previous step)
    let initial_review_active = submitted 
    let references_active = initial_review 
    let references_disabled = initial_review_active
    let home_visit_active = references 
    let home_visit_disabled = !references_active && !home_visit
    let final_approval_active = home_visit 
    let final_approval_disabled = !home_visit_active && !final_approval
    
    const steps = [
      {
        //need to figure out how to change active & disabled
        key: 'apply',
        // active: false,
        // disabled: false,
        completed: submitted,
        icon: 'pencil',
        title: 'Apply!',
        description: 'Submit your application'
      },
      {
        key: 'initial review',
        active: initial_review_active,
        completed: initial_review,
        icon: 'file alternate outline',
        title: 'Inital Review',
        description: "We're reviewing your application"
      },
      { key: 'references', 
        active: references_active,
        disabled: references_disabled, 
        completed: references,
        icon: 'ordered list', 
        title: 'References',
        description: "We're checking your references"
      },
      { key: 'home visit', 
        active: home_visit_active,
        disabled: home_visit_disabled, 
        completed: home_visit,
        icon: 'home', 
        title: 'Home Visit',
        description: "Home visit scheduled"
      },
      { key: 'final approval', 
        active: final_approval_active,
        disabled: final_approval_disabled, 
        completed: final_approval,
        icon: 'clipboard check', 
        title: 'Final Approval',
        description: "You're approved to adopt!"
      },
    ]
    if (this.props.userLoading){
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
      return (
        <Grid centered>
          <Step.Group vertical items={steps} />
        </Grid>
      )
    }
  }
}

function msp(state){
  return {
    user: state.user,
    userLoading: state.userLoading,
    adopterApplication: state.adopterApplication
  }
}

export default connect(msp)(ApplicationStatus)