import React, { Component } from 'react'
import { Grid, Step } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ApplicationStatus extends Component {

  render() {
    // console.log("APPLICATION STATUS", this.props.adopterApplication.initial_review)
    const {submitted, initial_review, references, home_visit, final_approval} = this.props.adopterApplication

    let initial_review_active = !initial_review && submitted 
    let references_active = !references && initial_review
    let home_visit_active = !home_visit && references 
    let final_approval_active = !final_approval && home_visit 
    let references_disabled = initial_review_active
    let home_visit_disabled
    if (references_active || initial_review_active) {
      home_visit_disabled = true
    } else {home_visit_disabled = false}
    let final_approval_disabled 
    if (home_visit_active || references_active || initial_review_active) {
      final_approval_disabled = true
    } else {final_approval_disabled = false}

    let final_approval_description = final_approval ? "You're approved to adopt!!!" : "You're almost approved to adopt!" 

    //make extra set of steps all complete for when application.final_approval
    const steps = [
      {

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
        description: `${final_approval_description}`
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