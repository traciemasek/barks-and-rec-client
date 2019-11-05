import React, { Component } from 'react'
import { connect } from "react-redux"
import TaskCard from './TaskCard'
import { Grid, Container, Menu, Segment, Table } from 'semantic-ui-react'


class TasksContainer extends Component {
  state = { activeItem: 'all' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderTasks() {
    return this.props.tasks.map(task => <TaskCard key={task.id} task={task}/>)
  }
  
  renderCategoryTasks(category) {
    let completedTasks = this.props.tasks.filter(task => task.complete).map(task => <TaskCard key={task.id} task={task}/>)
    let allTasks = this.props.tasks.filter(task => !task.complete).map(task => <TaskCard key={task.id} task={task}/>)
    let categoryTasks = this.props.tasks.filter(task => !task.complete).filter(task => task.category === category)

    if (category === "all") {
      return allTasks
    } else if (category === "Completed Tasks"){
      return completedTasks
    } else {
      return categoryTasks.map(task => <TaskCard key={task.id} task={task}/>)
    }
    
  }

  render() {
    const { activeItem } = this.state
    
    if (this.props.tasksLoading) {
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
      return (
        <div>
          <Grid centered >
            <Grid.Row></Grid.Row>
            <Grid.Row></Grid.Row>
            <Grid.Row>I will be a list of tasks for the admin to complete. Completing a task will update the corresponding step in the adopter's application status</Grid.Row>
            <Grid.Row></Grid.Row>
          
          

          <Container >
          <Menu attached='top' tabular color="teal">
            <Menu.Item
              icon='clipboard list'
              name='all'
              active={activeItem === 'all'}
              onClick={this.handleItemClick}>
              {/* All <Label>{this.renderCategoryTasks(activeItem).length}</Label> */}
            </Menu.Item>
            <Menu.Item
              icon='file alternate outline'
              name='initial_review'
              active={activeItem === 'initial_review'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              icon='ordered list'
              name='references'
              active={activeItem === 'references'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              icon='home'
              name='home_visit'
              active={activeItem === 'home_visit'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              icon='clipboard check'
              name='final_approval'
              active={activeItem === 'final_approval'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='Completed Tasks'
                active={activeItem === 'Completed Tasks'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu>
          <Segment attached='bottom' >
          <Table celled >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Complete</Table.HeaderCell> 
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Adopter Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Date Added</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderCategoryTasks(this.state.activeItem)}
            </Table.Body>
          </Table> 
          </Segment>
          {/* <Segment attached='bottom' >
            {this.renderCategoryTasks(this.state.activeItem)}
          </Segment> */}
          </Container>
          </Grid>
        </div>
      )
    }
  }
}

function msp(state){
  return {
    tasks: state.tasks,
    userLoading: state.userLoading,
    tasksLoading: state.tasksLoading
  }
}

export default connect(msp)(TasksContainer)