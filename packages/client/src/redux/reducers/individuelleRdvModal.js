const IndividuelleRdvModalReducer = (individuelleRdv = false, action) => {
  switch (action.type) {
    case 'INDIV_RDV':
      return !individuelleRdv

    default:
      return individuelleRdv
  }
}

export default IndividuelleRdvModalReducer
