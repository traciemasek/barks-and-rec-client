import { SET_ADOPTER_USER, SET_ADMIN_USER, LOGOUT, FETCH_ALL_DOGS, FETCH_ALL_ADOPTERS, FETCH_ALL_APPLICATIONS, ADD_FAVORITE, REMOVE_FAVORITE, SUBMIT_APPLICATION, FETCH_ALL_TASKS, FETCH_ALL_FAVORITES, NEW_TASK, FINAL_APPROVAL_TASK, ADD_DOG, UPDATE_DOG, REMOVE_NOTIFICATION, ADD_NOTIFICATION, ADD_FINAL_NOTIFICATION, ADD_APP_SUBMITTED_TASK } from "./types"

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
  allFavorites: [],
  adopterApplication: false,
  adopterNotifications: [],
  adopters: [],
  applications: [], 
  tasks: []
}

function reducer(prevState = defaultState, action) {
  //console.log("STATE", prevState)
  //console.log("ACTION", action)
  switch(action.type){
    case SET_ADOPTER_USER:
      return {...prevState, user: action.payload, admin: false, userLoading: false, favorites: action.payload.favorites, favoriteDogs: action.payload.dogs, adopterApplication: action.payload.application, adopterNotifications: action.payload.notifications}
    case ADD_FAVORITE:
      return {...prevState, favorites: [...prevState.favorites, action.payload.favorite], favoriteDogs: [...prevState.favoriteDogs, action.payload.favoriteDog]}
    case ADD_DOG:
      return {...prevState, dogs: [action.payload, ...prevState.dogs]}
    case UPDATE_DOG:
      let dogsCopy = [...prevState.dogs]
      const id = action.payload.id
      dogsCopy = dogsCopy.filter(dog => dog.id !== id)
      dogsCopy = [...dogsCopy, action.payload]
      return {...prevState, dogs: dogsCopy}
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
    case FETCH_ALL_APPLICATIONS:
      return {...prevState, applications: action.payload, applicationsLoading: false}
    case FETCH_ALL_TASKS:
      return {...prevState, tasks: action.payload, tasksLoading: false}
    case FETCH_ALL_FAVORITES:
      return {...prevState, allFavorites: action.payload}
    case SUBMIT_APPLICATION:
      return {...prevState, adopterApplication: action.payload.application}
    case ADD_APP_SUBMITTED_TASK:
      let tasksCopy = [...prevState.tasks, action.payload.task]
      return {...prevState, tasks: tasksCopy}
    case NEW_TASK:   
      let applicationsCopy2 = [...prevState.applications]
      //find the copy of the updated application and remove it from the array 
      applicationsCopy2 = applicationsCopy2.filter(application => application.id !==action.payload.updatedApplication.id)
      //replace it with the updated response 
      applicationsCopy2.push(action.payload.updatedApplication)
      //copy the current array of tasks and add the new one
      let tasksCopy2 = [...prevState.tasks, action.payload.newTask]
      //find the copy of the updated task
      let foundTask = tasksCopy2.find(task=>task.id === action.payload.updatedTask.id)
      //mark the updated task as complete
      foundTask.complete = true
      //add the new notification
      let notificationsCopy = [action.payload.notification, ...prevState.adopterNotifications]
      return {...prevState, applications: applicationsCopy2, tasks: tasksCopy2, adopterNotifications: notificationsCopy}
    case FINAL_APPROVAL_TASK:
      //update the task & the application
      let applicationsCopy3 = [...prevState.applications]
      //find the copy of the updated application 
      let foundApplication2 = applicationsCopy3.find(application=>application.id === action.payload.updatedApplication.id)
      //replace it with the updated response 
      foundApplication2.final_approval = true
      //copy the current array of tasks and add the new one
      let tasksCopy3 = [...prevState.tasks]
      //find the copy of the updated task
      let foundTask2 = tasksCopy3.find(task=>task.id === action.payload.updatedTask.id)
      //replace it with the updated task 
      foundTask2.complete = true
      //add the new notification
      let notificationsCopy2 = [action.payload.notification,...prevState.adopterNotifications]
      return {...prevState, applications: applicationsCopy3, tasks: tasksCopy3, adopterNotifications: notificationsCopy2}
    case ADD_NOTIFICATION:
      let notifications = [action.payload.notification, ...prevState.adopterNotifications]
      return {...prevState, adopterNotifications: notifications, adopterApplication: action.payload.updatedApplication}
    case ADD_FINAL_NOTIFICATION:
        let notifications2 = [action.payload.notification, ...prevState.adopterNotifications]
      return {...prevState, adopterNotifications: notifications2, adopterApplication: action.payload.updatedApplication}
    case REMOVE_NOTIFICATION:
      let adopterNotificationsCopy = [...prevState.adopterNotifications]
      let foundNotification = adopterNotificationsCopy.find(notification => notification.id === action.payload.id)
      foundNotification.read = true
      return {...prevState, adopterNotifications: adopterNotificationsCopy}
    default:
      return prevState
  }
}


export default reducer 
