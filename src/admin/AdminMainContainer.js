import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderAdmin from '../menus/HeaderAdmin'
import DogShow from '../dogs/DogShow';
import DogsContainer from '../dogs/DogsContainer';
import AdoptersContainer from './AdoptersContainer';
import AdoptersShow from './AdoptersShow';
import TasksContainer from './TasksContainer';
import { fetchAdopters, fetchApplications, fetchDogs } from '../actions';


class AdminMainContainer extends React.Component {

  componentDidMount() {
    this.props.fetchDogs()
    this.props.fetchAdopters()
    this.props.fetchApplications()
  }


  render() {
    if (this.props.loading) {
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
      return (
        <>
        <div>
          <HeaderAdmin/>
          <br/>
          <Switch>
            <Route path="/admin/dogs/:id" render={routerProps => {
              const { match } = routerProps
              const dogId = match.params.id
              return (
                <DogShow dogId={dogId}/>
              )
            }} />
            <Route path="/admin/dogs" render={() => {
              return <DogsContainer />
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
            <Route path="/admin" render={()=>{
              return (
              <>
              <h1>ADMINS ONLY!!! </h1>
              <div>
                This will be some sort of navigation that will likely live to the side <span role="img" aria-label="left arrow">⬅️</span> or maybe like some fancy dropdown shit
              </div>
      
              <p></p>
      
              <p>Would be cool if notifications can go here that tell the admins about new application submissions and tasks </p>
      
            
              {/* this no longer has router props so history.push won't work
              <button onClick={()=>this.props.history.push("/admin/dogs")}>See all dogs</button> */}


      
              <Link to="/admin/dogs">
                <button>See all dogs</button>
              </Link>

              <Link to="/admin/adopters">
                <button>See all adopters</button>
              </Link>
      
              <Link to="/admin/tasks">
                <button>See all tasks</button>
              </Link>
              </>
              )
            }} />
            
          </Switch>
            
          
        </div>
        </>
      )
    }
  }
}

function msp(state){
  // console.log("admin main state", state)
  return {
    user: state.user,
    dogs: state.dogs,
    loading: state.loading
  }
}


export default connect(msp, { fetchAdopters, fetchApplications, fetchDogs })(AdminMainContainer)