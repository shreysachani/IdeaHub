import { configureStore } from '@reduxjs/toolkit';
import userReducer from './stores/userSlice';
import toastReducer from './stores/toastSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer
  },
});

export default store;