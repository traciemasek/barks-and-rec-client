import { SET_ADOPTER_USER, SET_ADMIN_USER, LOGOUT, FETCH_ALL_DOGS, FETCH_ALL_ADOPTERS, FETCH_ALL_APPLICATIONS } from "./types"
//all mdp functions can go here and then export as named exports; redux automatically calls dispatch for you 
//this is good for actions that will be called in more than one component
//action creator

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
  setAdmin,
  setAdopter,
  logout
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