const defaultState = {
  loading: true,
  user: null,
  admin: false,
  dogs: [],
  adopters: [],
  applications: []
}

function reducer(prevState = defaultState, action) {
  //console.log("STATE", prevState)
  //console.log("ACTION", action)
  //whatever is returned from the reducer BECOMES state (replaces it in the store, no merging)
  switch(action.type){
    //when you log in an admin, set admin to true--need to figure this out for autologin
    case "STOP_LOADING":
      return {...prevState, loading: false}
    case "SET_ADOPTER_USER":
      return {...prevState, user: action.payload, admin: false}
    case "SET_ADMIN_USER":
      return {...prevState, user: action.payload, admin: true}
    case "LOGOUT":
      return {...prevState, user: null, admin: false}
    case "FETCH_ALL_DOGS":
      return {...prevState, dogs: action.payload}
    case "FETCH_ALL_ADOPTERS":
      return {...prevState, adopters: action.payload}
    case "FETCH_ALL_APPLICATIONS":
      return {...prevState, applications: action.payload}
    default:
      return prevState
  }
}


export default reducer 
//import in index.js
//import reducer from './reducer'