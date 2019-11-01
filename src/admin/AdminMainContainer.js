import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderAdmin from '../menus/HeaderAdmin'
import DogShow from '../dogs/DogShow';
import DogsContainer from '../dogs/DogsContainer';
import AdoptersContainer from './AdoptersContainer';
import AdoptersShow from './AdoptersShow';
import TasksContainer from './TasksContainer';


class AdminMainContainer extends React.Component {
  render() {
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
    
       
    
           
            <button onClick={()=>this.props.history.push("/admin/dogs")}>See all dogs</button>
    
            <Link to="/admin/tasks">
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

function msp(state){
  // console.log("adopter main state", state)
  return {
    dogs: state.dogs
  }
}

// function mdp(dispatch){
//   //moved the fetch to App bc it needs to happen earlier
//   return {
//     fetchDogs: (dogs) => {
//       dispatch({type: "FETCH_ALL_DOGS", payload: dogs})
//     }
//   }
// }

      


export default connect(msp)(AdminMainContainer)