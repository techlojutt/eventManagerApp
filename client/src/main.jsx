import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store/store.jsx';


import React from "react";
import './index.css'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
    <ToastContainer/>
  </BrowserRouter>
  </Provider>,
)
