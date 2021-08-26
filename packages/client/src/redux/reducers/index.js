import { combineReducers } from "redux";
import showSidebarReducer from "./showSideBarReducer";

const allReducers = combineReducers ({
   showSidebar : showSidebarReducer,
   hideSidebar : showSidebarReducer
})

export default allReducers