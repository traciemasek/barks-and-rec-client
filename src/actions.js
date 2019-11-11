import { SET_ADOPTER_USER, SET_ADMIN_USER, LOGOUT, FETCH_ALL_DOGS, FETCH_ALL_ADOPTERS, FETCH_ALL_APPLICATIONS, ADD_FAVORITE, REMOVE_FAVORITE, SUBMIT_APPLICATION, FETCH_ALL_TASKS, FETCH_ALL_FAVORITES, NEW_TASK, FINAL_APPROVAL_TASK, ADD_DOG, UPDATE_DOG, REMOVE_NOTIFICATION, ADD_FINAL_NOTIFICATION, ADD_NOTIFICATION } from "./types"


function fetchDogs() {
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/dogs")
    .then(resp => resp.json())
    .then(dogs => {
      dispatch({type: FETCH_ALL_DOGS, payload: dogs})
    })
  }
}

function fetchAllFavorites() {
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/favorites")
    .then(resp => resp.json())
    .then(favorites => {
      dispatch({type: FETCH_ALL_FAVORITES, payload: favorites})
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

function createDog(body){
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(response => {
      console.log(response)
      dispatch({type: ADD_DOG, payload: response})
    })
  }
}

function updateDog(body, id){
  return function(dispatch){
    fetch(`http://localhost:6969/api/v1/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(response => {
      console.log(response)
      dispatch({type: UPDATE_DOG, payload: response})
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
      dispatch({type: SUBMIT_APPLICATION, payload: response})
    })
    }
  }

function completeTask(taskBody){
  return function(dispatch){
    fetch("http://localhost:6969/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(taskBody)
    })
    .then(resp => resp.json())
    .then(response => {
      console.log("complete task response", response)
      dispatch({type: NEW_TASK, payload: response})
    })
    }
}

function finalApprovalTask(taskBody, id){
  return function(dispatch){
    //  this is going to update action in tasks, probably want to make a custom route
    fetch(`http://localhost:6969/api/v1/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(taskBody)
    })
    .then(resp => resp.json())
    .then(response => {
      console.log("complete final task response", response)
      dispatch({type: FINAL_APPROVAL_TASK, payload: response})
    })
  }
}

function removeNotification(id){
  return function(dispatch){
    fetch(`http://localhost:6969/api/v1/notifications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      // body: JSON.stringify({read: true})
    })
    .then(resp => resp.json())
    .then(response => {
      console.log("remove notification response", response)
      dispatch({type: REMOVE_NOTIFICATION, payload: response})
    })
  }
}

function addNotification(response){
  console.log("addNotification action", response)
  //from adopter perspective 
  return {type: ADD_NOTIFICATION, payload: response}
}

function addFinalNotification(response){
  console.log("addNotification action", response)
  //from adopter perspective 
  return {type: ADD_FINAL_NOTIFICATION, payload: response}
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
  submitApplication,
  fetchAllFavorites,
  completeTask,
  finalApprovalTask,
  createDog, 
  updateDog, 
  removeNotification, 
  addNotification, 
  addFinalNotification
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