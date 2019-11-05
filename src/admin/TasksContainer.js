import React, { Component } from 'react'
import { connect } from "react-redux"
import TaskCard from './TaskCard'

class TasksContainer extends Component {
  renderTasks() {
    return this.props.tasks.map(task => <TaskCard key={task.id} task={task}/>)
  }

  render() {
    return (
      <div>
        I will be a list of tasks for the admin to complete. Completing a task will update the corresponding step in the adopter's application status
        {this.renderTasks()}
      </div>
    )
  }
}

function msp(state){
  return {
    tasks: state.tasks
  }
}

export default connect(msp)(TasksContainer)