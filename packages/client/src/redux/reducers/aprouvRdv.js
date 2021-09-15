const aprouvRdvModalReducer = (aprouvRdv = false, action) => {
    switch (action.type) {
      case 'APROUV_RDV':
        return !aprouvRdv
  
      default:
        return aprouvRdv
    }
  }
  
  export default aprouvRdvModalReducer
  