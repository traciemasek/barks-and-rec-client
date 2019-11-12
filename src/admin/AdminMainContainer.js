import React from 'react'
// import banner05 from '../images/banner05.jpg'
import banner05 from '../images/banner05_text.png'
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderAdmin from '../menus/HeaderAdmin'
import AdminDogShow from '../dogs/AdminDogShow';
import AdminDogsContainer from '../dogs/AdminDogsContainer';
import AdoptersContainer from './AdoptersContainer';
import AdoptersShow from './AdoptersShow';
import TasksContainer from './TasksContainer';
import NewDog from '../dogs/NewDog';
import { fetchAdopters, fetchApplications, fetchDogs, fetchTasks, fetchAllFavorites, addAppSubmittedTask } from '../actions';
import AdoptableDogsTeaserCard from '../teasers/AdoptableDogsTeaserCard'
import TasksTeaserCard from '../teasers/TasksTeaserCard'
import AdoptersTeaserCard from '../teasers/AdoptersTeaserCard'
import { Grid, Card, Image } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider';



class AdminMainContainer extends React.Component {

  componentDidMount() {
    this.props.fetchDogs()
    this.props.fetchAdopters()
    this.props.fetchApplications()
    this.props.fetchTasks()
    this.props.fetchAllFavorites()
  }


  render() {

    // const style = {
    //   backgroundImage: `url(${banner05})`,
    //   backgroundPosition: 'center',
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat',
    //   height: "35vh",
    //   width: "100vw"
    // }


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

          {/* <Grid centered>
            <Grid.Row></Grid.Row>
          <Grid.Column width={12}> */}
      
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
              <div><Image fluid src={banner05}></Image></div>

              <Grid centered>
                <Grid.Row></Grid.Row>
                <Grid.Column width={12}>

                  <Grid verticalAlign="top" centered>
                    <Grid.Row></Grid.Row>
                    <Grid.Row></Grid.Row>
                  
                    <Card.Group itemsPerRow={3} centered>
                      <AdoptableDogsTeaserCard />
                      <TasksTeaserCard />
                      <AdoptersTeaserCard />
                    </Card.Group>
              
                  </Grid>
                </Grid.Column>
              </Grid>
              </>)
            }} />
            
          </Switch>
        {/* </Grid.Column>
      </Grid>  */}

      <ActionCableConsumer
        channel={{ channel: 'TaskChannel' }}
        onReceived={response => {
          console.log("action cable task consumer", response);
          this.props.addAppSubmittedTask(response)
        }}
      />

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


export default connect(msp, { fetchAdopters, fetchApplications, fetchDogs, fetchTasks, fetchAllFavorites, addAppSubmittedTask })(AdminMainContainer)