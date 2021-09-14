const collectifRdvModalReducer = (collecRdv = false, action) => {
  switch (action.type) {
    case 'COLLEC_RDV':
      return !collecRdv

    default:
      return collecRdv
  }
}

export default collectifRdvModalReducer
