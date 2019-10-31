const defaultState = {
  user: null,
  dogs: []
}

function reducer(prevState = defaultState, action) {
  //console.log("STATE", prevState)
  //console.log("ACTION", action)
  //whatever is returned from the reducer BECOMES state (replaces it in the store, no merging)
  switch(action.type){
    // case "ACTION_NAME":
    //   return {...prevState, key: newKey}
    // more cases
    case "FETCH_ALL_DOGS":
      return {...prevState, dogs: action.payload}
    default:
      return prevState
  }
}


export default reducer 
//import in index.js
//import reducer from './reducer'