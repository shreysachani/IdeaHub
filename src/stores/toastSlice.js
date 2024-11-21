// src/store/toastSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ms: 0,
  message: '',
  classes: '',
  isVisible: false
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      const { ms, message, classes } = action.payload;
      
      state.ms = parseInt(ms);
      state.message = message;
      state.classes = classes;
      state.isVisible = true;

      // Handle animation logic with setTimeout (same logic as in Vue)
      setTimeout(() => {
        state.classes += ' -translate-y-28';
      }, 10);

      setTimeout(() => {
        state.classes = state.classes.replace('-translate-y-28', '');
      }, state.ms - 500);

      setTimeout(() => {
        state.isVisible = false;
      }, state.ms);
    }
  }
});

export const { showToast } = toastSlice.actions;

export default toastSlice.reducer;
