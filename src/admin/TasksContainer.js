import React, { Component } from 'react'
import { connect } from "react-redux"
import TaskCard from './TaskCard'
import { Grid, Container, Menu, Segment, Table, Label, Icon } from 'semantic-ui-react'


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

          <Container >
          <Menu attached='top' tabular color="teal">
            <Menu.Item
              name='all'
              active={activeItem === 'all'}
              onClick={this.handleItemClick}>
                <Icon name='clipboard list'/>
                All 
                {this.renderCategoryTasks("all").length > 0 ?
                <Label color="teal" size="mini">{this.renderCategoryTasks("all").length}</Label> : null}
            </Menu.Item>
            
            <Menu.Item
              name='initial_review'
              active={activeItem === 'initial_review'}
              onClick={this.handleItemClick}>
                <Icon name='file alternate outline'/>
                Initial Review 
                {this.renderCategoryTasks("initial_review").length > 0 ?
                <Label color="teal" size="mini">{this.renderCategoryTasks("initial_review").length}</Label> : null}
            </Menu.Item>

            <Menu.Item
              name='references'
              active={activeItem === 'references'}
              onClick={this.handleItemClick}>
              <Icon name='ordered list'/>
              References 
              {this.renderCategoryTasks("references").length > 0 ? <>
              <Label color="teal" size="mini">{this.renderCategoryTasks("references").length}</Label></> : null}
            </Menu.Item>

            <Menu.Item
              name='home_visit'
              active={activeItem === 'home_visit'}
              onClick={this.handleItemClick}>
              <Icon name='home'/>
              Home Visit 
              {this.renderCategoryTasks("home_visit").length > 0 ?
              <Label color="teal" size="mini">{this.renderCategoryTasks("home_visit").length}</Label>: null}
            </Menu.Item>
            
            <Menu.Item
              name='final_approval'
              active={activeItem === 'final_approval'}
              onClick={this.handleItemClick}>
              <Icon name='clipboard check'/>
              Final Approval
              {this.renderCategoryTasks("final_approval").length > 0 ? 
              <Label color="teal" size="mini">{this.renderCategoryTasks("final_approval").length}</Label> : null}
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item
                name='Completed Tasks'
                active={activeItem === 'Completed Tasks'}
                onClick={this.handleItemClick}>{
                  this.renderCategoryTasks("Completed Tasks").length > 0 ? <>
                Completed Tasks
                <Label size="mini">{this.renderCategoryTasks("Completed Tasks").length}</Label></> : null}
              </Menu.Item>
  
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