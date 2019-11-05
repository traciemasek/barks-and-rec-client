import { SET_ADOPTER_USER, SET_ADMIN_USER, LOGOUT, FETCH_ALL_DOGS, FETCH_ALL_ADOPTERS, FETCH_ALL_APPLICATIONS, ADD_FAVORITE, REMOVE_FAVORITE, SUBMIT_APPLICATION, FETCH_ALL_TASKS } from "./types"

const defaultState = {
  userLoading: true,
  dogsLoading: true,
  adoptersLoading: true,
  applicationsLoading: true,
  tasksLoading: true,
  user: null,
  admin: false,
  dogs: [],
  favorites: [],
  favoriteDogs: [],
  adopterApplication: false,
  adopters: [],
  applications: [], 
  tasks: []
}

function reducer(prevState = defaultState, action) {
  //console.log("STATE", prevState)
  //console.log("ACTION", action)
  switch(action.type){
    case SET_ADOPTER_USER:
      return {...prevState, user: action.payload, admin: false, userLoading: false, favorites: action.payload.favorites, favoriteDogs: action.payload.dogs, adopterApplication: action.payload.application}
    case ADD_FAVORITE:
      return {...prevState, favorites: [...prevState.favorites, action.payload.favorite], favoriteDogs: [...prevState.favoriteDogs, action.payload.favoriteDog]}
    case REMOVE_FAVORITE:
      let favoritesCopy = [...prevState.favorites]
      let favoriteDogsCopy = [...prevState.favoriteDogs]
      const dogId = action.payload.dog_id
      const favoriteId = action.payload.id
      favoriteDogsCopy = favoriteDogsCopy.filter(dog => dog.id !== dogId)
      favoritesCopy = favoritesCopy.filter(favorite => favorite.id !== favoriteId)
      return {...prevState, favorites: favoritesCopy, favoriteDogs: favoriteDogsCopy}
    case SET_ADMIN_USER:
      return {...prevState, user: action.payload, admin: true, userLoading: false}
    case LOGOUT:
      return {...prevState, user: null, admin: false}
    case FETCH_ALL_DOGS:
      return {...prevState, dogs: action.payload, dogsLoading: false}
    case FETCH_ALL_ADOPTERS:
      return {...prevState, adopters: action.payload, adoptersLoading: false}
      //am I using all applications for anything???
    case FETCH_ALL_APPLICATIONS:
      return {...prevState, applications: action.payload, applicationsLoading: false}
    case FETCH_ALL_TASKS:
      return {...prevState, tasks: action.payload, tasksLoading: false}
    case SUBMIT_APPLICATION:
      let tasksCopy = [...prevState.tasks, ...action.payload.tasks]
      let applicationsCopy = [...prevState.applications, action.payload.application]
      //add tasks to tasks without nesting them in another array!!!
      //add application to adopterApplication and applications 
      return {...prevState, adopterApplication: action.payload.application, tasks: tasksCopy, applications: applicationsCopy}
    default:
      return prevState
  }
}


export default reducer 
