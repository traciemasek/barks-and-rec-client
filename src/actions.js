//all mdp functions can go here and then export as named exports; redux automatically calls dispatch for you 
//this is good for actions that will be called in more than one component
//action creator

function stopLoading() {
  return {type: "STOP_LOADING"}
}

function fetchDogs(dogs) {
  return {type: "FETCH_ALL_DOGS", payload: dogs}
}


export {
  stopLoading, 
  fetchDogs
}