import { SET_ADOPTER_USER, SET_ADMIN_USER, LOGOUT, FETCH_ALL_DOGS, FETCH_ALL_ADOPTERS, FETCH_ALL_APPLICATIONS, ADD_FAVORITE, REMOVE_FAVORITE, SUBMIT_APPLICATION, FETCH_ALL_TASKS, FETCH_ALL_FAVORITES, NEW_TASK, FINAL_APPROVAL_TASK, ADD_DOG, UPDATE_DOG, REMOVE_NOTIFICATION, ADD_FINAL_NOTIFICATION, ADD_NOTIFICATION, ADD_APP_SUBMITTED_TASK } from "./types"

const API_URL = `http://localhost:3001/api/v1`;

const headers = {
  Accepts: 'application/json',
  'Content-Type': 'application/json'
}


function fetchDogs() {
  return function(dispatch){
    fetch(`${API_URL}/dogs`)
    .then(resp => resp.json())
    .then(dogs => {
      dispatch({type: FETCH_ALL_DOGS, payload: dogs})
    })
  }
}

function fetchAllFavorites() {
  return function(dispatch){
    fetch(`${API_URL}/favorites`)
    .then(resp => resp.json())
    .then(favorites => {
      dispatch({type: FETCH_ALL_FAVORITES, payload: favorites})
    })
  }
}

function fetchAdopters() {
  return function(dispatch){
    fetch(`${API_URL}/adopters`)
    .then(resp => resp.json())
    .then(adopters => {
      dispatch({type: FETCH_ALL_ADOPTERS, payload: adopters})
    })
  }
}

function fetchApplications() {
  return function(dispatch){
    fetch(`${API_URL}/applications`)
    .then(resp => resp.json())
    .then(applications => {
      dispatch({type: FETCH_ALL_APPLICATIONS, payload: applications})
    })
  }
}

function fetchTasks() {
  return function(dispatch){
    fetch(`${API_URL}/tasks`)
    .then(resp => resp.json())
    .then(tasks => {
      dispatch({type: FETCH_ALL_TASKS, payload: tasks})
    })
  }
}

function createDog(body){
  return function(dispatch){
    fetch(`${API_URL}/dogs`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(response => {
      dispatch({type: ADD_DOG, payload: response})
    })
  }
}

function updateDog(body, id){
  return function(dispatch){
    fetch(`${API_URL}/dogs/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(response => {
      dispatch({type: UPDATE_DOG, payload: response})
    })
  }
}

function createFavorite(body) {
  return function(dispatch){
    fetch(`${API_URL}/favorites`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(response => {
      dispatch({type: ADD_FAVORITE, payload: response})
    })
  }
}

function removeFavorite(id) {
  return function(dispatch){
    fetch(`${API_URL}/favorites/${id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(response => {
      dispatch({type: REMOVE_FAVORITE, payload: response})
    })
  }
}

function submitApplication(application) {
  return function(dispatch){
    fetch(`${API_URL}/applications`, {
      method: "POST",
      headers,
      body: JSON.stringify(application)
    })
    .then(resp => resp.json())
    .then(response => {
      dispatch({type: SUBMIT_APPLICATION, payload: response})
    })
    }
  }

function completeTask(taskBody){
  return function(dispatch){
    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers,
      body: JSON.stringify(taskBody)
    })
    .then(resp => resp.json())
    .then(response => {
      dispatch({type: NEW_TASK, payload: response})
    })
    }
}

function finalApprovalTask(taskBody, id){
  return function(dispatch){
    fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(taskBody)
    })
    .then(resp => resp.json())
    .then(response => {
      dispatch({type: FINAL_APPROVAL_TASK, payload: response})
    })
  }
}

function removeNotification(id){
  return function(dispatch){
    fetch(`${API_URL}/notifications/${id}`, {
      method: "PATCH",
      headers,
    })
    .then(resp => resp.json())
    .then(response => {
      dispatch({type: REMOVE_NOTIFICATION, payload: response})
    })
  }
}

function addNotification(response){
  //from adopter perspective 
  return {type: ADD_NOTIFICATION, payload: response}
}

function addFinalNotification(response){
  //from adopter perspective 
  return {type: ADD_FINAL_NOTIFICATION, payload: response}
}

function addAppSubmittedTask(response){
  //from admin perspective
  return {type: ADD_APP_SUBMITTED_TASK, payload: response}
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
  addFinalNotification,
  addAppSubmittedTask
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