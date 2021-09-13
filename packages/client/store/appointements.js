import { createSlice } from '@reduxjs/toolkit'

const appointementsSlice = createSlice({
  name: 'appointements',
  initialState: {},
  reducers: {
    addApointement: (apointements, action) => {
      apointements.list.push(action.payload)
    }
  }
})

export default appointementsSlice.reducer
export const { addApointement } = appointementsSlice.actions
