import { createSlice } from '@reduxjs/toolkit'

const sideBarSlice = createSlice({
  name: 'showSideBar',
  initialState: {},
  reducers: {
    SHOW_SIDE: (sideBar, action) => {},
    HIDE_SIDE: (sideBar, action) => {}
  }
})

export default sideBarSlice.reducer
export const { SHOW_SIDE, HIDE_SIDE } = sideBarSlice.actions
