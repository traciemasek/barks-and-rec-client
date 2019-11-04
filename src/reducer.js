import { SET_ADOPTER_USER, SET_ADMIN_USER, LOGOUT, FETCH_ALL_DOGS, FETCH_ALL_ADOPTERS, FETCH_ALL_APPLICATIONS, ADD_FAVORITE } from "./types"

const defaultState = {
  userLoading: true,
  dogsLoading: true,
  adoptersLoading: true,
  applicationsLoading: true,
  user: null,
  admin: false,
  dogs: [],
  favorites: [],
  adopterApplication: null,
  adopters: [],
  applications: []
}


//how to set favorites? serialized from user and just add them when you set the user and then update with each post request? push the response from the post into the array???

function reducer(prevState = defaultState, action) {
  //console.log("STATE", prevState)
  //console.log("ACTION", action)

  //whatever is returned from the reducer BECOMES state (replaces it in the store, no merging)
  switch(action.type){
    
    case SET_ADOPTER_USER:
      return {...prevState, user: action.payload, admin: false, userLoading: false, favorites: action.payload.dogs, adopterApplication: action.payload.application}

    case ADD_FAVORITE:
      return {}
    case SET_ADMIN_USER:
      return {...prevState, user: action.payload, admin: true, userLoading: false}
    case LOGOUT:
      return {...prevState, user: null, admin: false}
    case FETCH_ALL_DOGS:
      return {...prevState, dogs: action.payload, dogsLoading: false}
    case FETCH_ALL_ADOPTERS:
      return {...prevState, adopters: action.payload, adoptersLoading: false}
    case FETCH_ALL_APPLICATIONS:
      return {...prevState, applications: action.payload, applicationsLoading: false}
    default:
      return prevState
  }
}


export default reducer 
