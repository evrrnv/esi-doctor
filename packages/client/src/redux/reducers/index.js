import { combineReducers } from 'redux'
import showSidebarReducer from './showSideBarReducer'
import collectifRdvModalReducer from './collectifRdvModal'
import IndividuelleRdvModalReducer from './individuelleRdvModal'
import typeRdvModalReducer from './typeRdv'
const allReducers = combineReducers({
  showSidebar: showSidebarReducer,
  hideSidebar: showSidebarReducer,
  toggleTypeRdvModal: typeRdvModalReducer,
  toggleCollecRdvModal: collectifRdvModalReducer,
  toggleIndividuelleRdvModal: IndividuelleRdvModalReducer
})

export default allReducers
