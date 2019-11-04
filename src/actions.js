import { SET_ADOPTER_USER, SET_ADMIN_USER, LOGOUT, FETCH_ALL_DOGS, FETCH_ALL_ADOPTERS, FETCH_ALL_APPLICATIONS } from "./types"


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
      console.log(response)
      //i need to get the dog obj and add it to favorites. I'm sending back both the favorite obj and the dog obj, so just add the dog obj to favorites
      //might be worth setting up the serializer first and trying to figure out that whole mess with rendering the heart and making it clickable
      //or do I just straight up add the favorite obj and then mess with it in the favorites container to get the right dogs to render?
      //dispatch {type: ADD_FAVORITE, payload: favoriteDog}
    })
  }
}

function setAdmin(admin) {
  return {type: SET_ADMIN_USER, payload: admin}
} 

//need to add favorites to payload, probably as the dog objects?
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
  logout,
  createFavorite
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