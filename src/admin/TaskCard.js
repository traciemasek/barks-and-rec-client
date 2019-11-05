import React, { Component } from 'react'

class TaskCard extends Component {
  render() {
    let { category, adopter_id } = this.props.task
    return (

      <div>
        Task Category: {category}
        Task AdopterId: {adopter_id}
      </div>
    )
  }
}

export default TaskCard
