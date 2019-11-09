import React, { Component } from 'react'
import { Checkbox, Table, Icon } from 'semantic-ui-react'
import { connect } from "react-redux"
import { completeTask, finalApprovalTask } from "../actions"

class TaskCard extends Component {

  categoryPretty = category => {
    switch (category) {
      case "initial_review":
        return "Initial Review";
      case "references":
        return "Reference Check";
      case "home_visit":
        return "Home Visit";
      case "final_approval":
        return "Final Approval";
      default:
        return ""
    }
  }

  icon = category => {
    switch (category) {
      case "initial_review":
        return "file alternate outline";
      case "references":
        return "ordered list";
      case "home_visit":
        return "home";
      case "final_approval":
        return "clipboard check";
      default:
        return ""
    }
  }

  handleComplete = () => {
    let { id, category, adopter_id } = this.props.task
 
    let taskBody = {
      id: id, 
      category: category,
      adopter_id: adopter_id
    }
    if (category === "final_approval") {
      this.props.finalApprovalTask(taskBody, id)
    } else {
      this.props.completeTask(taskBody)
    }
  }

  render() {
    // console.log("task card props", this.props)
    let { category, adopter_id, complete, created_at } = this.props.task
    let month = created_at.slice(8, 10)
    let day = created_at.slice(5, 7)
    let year = created_at.slice(0, 4)
    let date = `${day}/${month}/${year}`
    let adopterName
    if (this.props.adopters.length > 0) {
      let adopter = this.props.adopters.find(adopter => adopter.id === adopter_id)
      adopterName = adopter.first_name + ' ' + adopter.last_name
    }

    //if complete, defaultChecked & disabled as props for checkbox
    if (complete) {
      return (
      <Table.Row>
        <Table.Cell collapsing >
          <Checkbox defaultChecked disabled/>
        </Table.Cell>
        <Table.Cell> <Icon name={this.icon(category)}/>{this.categoryPretty(category)}</Table.Cell>
        <Table.Cell>{adopterName}</Table.Cell>
        <Table.Cell>{complete ? "Complete" : "Pending"}</Table.Cell>
        <Table.Cell>{date}</Table.Cell>
      </Table.Row>
    )
    } else {
    return (
      <Table.Row>
        <Table.Cell collapsing >
          <Checkbox onClick={this.handleComplete}/>
        </Table.Cell>
        <Table.Cell> <Icon name={this.icon(category)}/>{this.categoryPretty(category)}</Table.Cell>
        <Table.Cell>{adopterName}</Table.Cell>
        <Table.Cell>{complete ? "Complete" : "Pending"}</Table.Cell>
        <Table.Cell>{date}</Table.Cell>
      </Table.Row>
    )
    }
  }
}

function msp(state){
  return {
    adopters: state.adopters
  }
}

export default connect(msp, { completeTask , finalApprovalTask})(TaskCard)
