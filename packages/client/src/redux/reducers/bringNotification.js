const bringNotificationReducer = (notification ={}, action)=>
  {

    if ((action.type === 'APROUV_RDV') 
         && 
         (typeof action.notification !== "undefined")) {
      return action.notification
  }
  return notification
}

export default bringNotificationReducer;