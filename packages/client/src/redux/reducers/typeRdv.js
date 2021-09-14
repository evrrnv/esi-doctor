const typeRdvModalReducer = (typeRdv = false, action) => {
  switch (action.type) {
    case 'TYPE_RDV':
      return !typeRdv

    default:
      return typeRdv
  }
}

export default typeRdvModalReducer
