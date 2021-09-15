const bringPatientReducer = (patient ={}, action)=>
  {

    if ((action.type === 'ARCHIVER') 
         && 
         (typeof action.patient !== "undefined")) {
      return action.patient
  }
  return patient
}

export default bringPatientReducer;