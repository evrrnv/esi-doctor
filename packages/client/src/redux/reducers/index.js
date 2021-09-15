import { combineReducers } from 'redux'
import showSidebarReducer from './showSideBarReducer'
import collectifRdvModalReducer from './collectifRdvModal'
import IndividuelleRdvModalReducer from './individuelleRdvModal'
import typeRdvModalReducer from './typeRdv'
import aprouvRdvModalReducer from './aprouvRdv'


const allReducers = combineReducers({
  showSidebar: showSidebarReducer,
  hideSidebar: showSidebarReducer,
  toggleTypeRdvModal: typeRdvModalReducer,
  toggleCollecRdvModal: collectifRdvModalReducer,
  toggleIndividuelleRdvModal: IndividuelleRdvModalReducer,
  toggleAprouvRdv : aprouvRdvModalReducer
})

export default allReducers
