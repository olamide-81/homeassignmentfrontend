import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/authslice'
import messageReducer from '../redux/messageslice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer
  },
})