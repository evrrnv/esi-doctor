import { combineReducers } from 'redux'
import appointementReducer from './appointements'
import sideBarReducer from "./sideBar"

export default combineReducers({
  appointements: appointementReducer,
  showSideBar:sideBarReducer
})
