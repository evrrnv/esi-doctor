const archiveModalReducer = (archive = false, action) => {
    switch (action.type) {
      case 'ARCHIVER':
        return !archive
  
      default:
        return archive
    }
  }
  
  export default archiveModalReducer
  