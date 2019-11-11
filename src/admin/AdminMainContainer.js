import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderAdmin from '../menus/HeaderAdmin'
import AdminDogShow from '../dogs/AdminDogShow';
import AdminDogsContainer from '../dogs/AdminDogsContainer';
import AdoptersContainer from './AdoptersContainer';
import AdoptersShow from './AdoptersShow';
import TasksContainer from './TasksContainer';
import NewDog from '../dogs/NewDog';
import { fetchAdopters, fetchApplications, fetchDogs, fetchTasks, fetchAllFavorites } from '../actions';
import AdoptableDogsTeaserCard from '../teasers/AdoptableDogsTeaserCard'
import TasksTeaserCard from '../teasers/TasksTeaserCard'
import AdoptersTeaserCard from '../teasers/AdoptersTeaserCard'
import { Grid, Card } from 'semantic-ui-react'




class AdminMainContainer extends React.Component {

  componentDidMount() {
    this.props.fetchDogs()
    this.props.fetchAdopters()
    this.props.fetchApplications()
    this.props.fetchTasks()
    this.props.fetchAllFavorites()
  }


  render() {
    if (this.props.userLoading) {
      return (
        <Grid centered>
          <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
        </Grid>
      )
    } else {
      return (
        <div>
          <HeaderAdmin/>

          <Grid centered>
            <Grid.Row></Grid.Row>
          <Grid.Column width={12}>
      
          <Switch>
            <Route path="/admin/dogs/:id" render={routerProps => {
              const { match } = routerProps
              const dogId = match.params.id
              return (
                <AdminDogShow dogId={dogId}/>
              )
            }} />
            <Route path="/admin/dogs" render={() => {
              return <AdminDogsContainer />
            }}/>
            <Route path="/admin/adopters/:id" render={() => {
              return <AdoptersShow />
            }} />
            <Route path="/admin/adopters" render={() => {
              return <AdoptersContainer />
            }} />
            <Route path="/admin/tasks" render={() => {
              return <TasksContainer />
            }} />
            <Route path="/admin/new" render={() => {
              return <NewDog />
            }} />
            <Route path="/admin" render={()=>{
              return (
              <>
              <Grid verticalAlign="top" centered>
                <Grid.Row>
                  <h1>ADMINS ONLY!!! </h1>
                </Grid.Row>
                <Grid.Row></Grid.Row>
              
                <Card.Group itemsPerRow={3} centered>
                  <AdoptableDogsTeaserCard />
                  <TasksTeaserCard />
                  <AdoptersTeaserCard />
                </Card.Group>
            
              </Grid>
    
              </>)
            }} />
            
          </Switch>
        </Grid.Column>
      </Grid> 
     </div>
    )
    }
  }
}

function msp(state){
  // console.log("admin main state", state)
  return {
    user: state.user,
    dogs: state.dogs,
    userLoading: state.userLoading
  }
}


export default connect(msp, { fetchAdopters, fetchApplications, fetchDogs, fetchTasks, fetchAllFavorites })(AdminMainContainer)