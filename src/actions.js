import { SET_ADOPTER_USER, SET_ADMIN_USER, LOGOUT, FETCH_ALL_DOGS, FETCH_ALL_ADOPTERS, FETCH_ALL_APPLICATIONS, ADD_FAVORITE, REMOVE_FAVORITE, SUBMIT_APPLICATION, FETCH_ALL_TASKS } from "./types"


function fetchDogs() {
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/dogs")
    .then(resp => resp.json())
    .then(dogs => {
      dispatch({type: FETCH_ALL_DOGS, payload: dogs})
    })
  }
}

function fetchAdopters() {
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/adopters")
    .then(resp => resp.json())
    .then(adopters => {
      dispatch({type: FETCH_ALL_ADOPTERS, payload: adopters})
    })
  }
}

//actually probably want this serialized to come attached to each Adopter
function fetchApplications() {
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/applications")
    .then(resp => resp.json())
    .then(applications => {
      dispatch({type: FETCH_ALL_APPLICATIONS, payload: applications})
    })
  }
}

function fetchTasks() {
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/tasks")
    .then(resp => resp.json())
    .then(tasks => {
      dispatch({type: FETCH_ALL_TASKS, payload: tasks})
    })
  }
}

function createFavorite(body) {
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(response => {
      // console.log(response.favoriteDog)
      dispatch({type: ADD_FAVORITE, payload: response})
    })
  }
}

function removeFavorite(id) {
  return function(dispatch){
    fetch(`http://localhost:6969/api/v1/favorites/${id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(response => {
      // console.log(response)
      dispatch({type: REMOVE_FAVORITE, payload: response})
    })
  }
}

function submitApplication(application) {
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(application)
    })
    .then(resp => resp.json())
    .then(response => {
      console.log("submitapplication response", response)
      // response should also include all 4 tasks which need to be added to tasks in redux
      //make sure you're attaching the tasks as an array of tasks
      dispatch({type: SUBMIT_APPLICATION, payload: response})
    })
    }
  }


function setAdmin(admin) {
  return {type: SET_ADMIN_USER, payload: admin}
} 

function setAdopter(adopter) {
  return {type: SET_ADOPTER_USER, payload: adopter}
}

function logout() {
  return {type: LOGOUT}
}


export {
  fetchAdopters,
  fetchApplications,
  fetchDogs,
  fetchTasks,
  setAdmin,
  setAdopter,
  logout,
  createFavorite,
  removeFavorite,
  submitApplication
}

//for thunky actions:
// function templateAction(argsFromComponent){
//   return function(dispatch){
//     fetch("url")
//     .then(resp => resp.json())
//     .then(response => {
//       dispatch({type: "", payload: {}})
//     })
//   }
// }