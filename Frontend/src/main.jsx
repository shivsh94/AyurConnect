 import React from 'react';
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import './index.css'
// import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
    <Toaster/>
  </React.StrictMode>,
)
