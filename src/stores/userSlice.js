import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for the user
const initialState = {
  user: {
    isAuthenticated: false,
    id: null,
    name: null,
    email: null,
    access: null,
    refresh: null,
    avatar: null,
  },
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initStore: (state) => {
      const userAccess = localStorage.getItem('user.access');
      if (userAccess) {
        state.user.access = userAccess;
        state.user.refresh = localStorage.getItem('user.refresh');
        state.user.id = localStorage.getItem('user.id');
        state.user.name = localStorage.getItem('user.name');
        state.user.email = localStorage.getItem('user.email');
        state.user.avatar = localStorage.getItem('user.avatar');
        state.user.isAuthenticated = true;
      }
    },
    setToken: (state, action) => {
      const { access, refresh } = action.payload;

      console.log("access", access, refresh)
      state.user.access = access;
      state.user.refresh = refresh;
      state.user.isAuthenticated = true;

      localStorage.setItem('user.access', access);
      localStorage.setItem('user.refresh', refresh);
    },
    removeToken: (state) => {
      state.user.refresh = null;
      state.user.access = null;
      state.user.isAuthenticated = false;
      state.user.id = null;
      state.user.name = null;
      state.user.email = null;
      state.user.avatar = null;

      localStorage.removeItem('user.access');
      localStorage.removeItem('user.refresh');
      localStorage.removeItem('user.id');
      localStorage.removeItem('user.name');
      localStorage.removeItem('user.email');
      localStorage.removeItem('user.avatar');
    },
    setUserInfo: (state, action) => {
      const { id, name, email, avatar } = action.payload;

      console.log("action", action.payload)
      state.user.id = id;
      state.user.name = name;
      state.user.email = email;
      state.user.avatar = avatar;

      localStorage.setItem('user.id', id);
      localStorage.setItem('user.name', name);
      localStorage.setItem('user.email', email);
      localStorage.setItem('user.avatar', avatar);
    },
    refreshToken: (state) => {
      axios.post('/api/refresh/', { refresh: state.user.refresh })
        .then((response) => {
          state.user.access = response.data.access;
          localStorage.setItem('user.access', response.data.access);
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
        })
        .catch((error) => {
          console.error('Error refreshing token:', error);
          // Remove token on error
          userSlice.actions.removeToken();
        });
    },
  },
});

export const { initStore, setToken, removeToken, setUserInfo, refreshToken } = userSlice.actions;

export default userSlice.reducer;
