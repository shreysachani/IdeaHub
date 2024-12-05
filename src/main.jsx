import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store.js'
import { Provider } from 'react-redux'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

if(localStorage.getItem("token")) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <ToastContainer />
      <App />
     </Provider>
  </StrictMode>,
)
