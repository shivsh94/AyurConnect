import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { AuthProvider } from './contexts/AuthContext.jsx'
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#f44336',
                secondary: '#fff',
              },
            },
          }}
        />
      </GoogleOAuthProvider>
    </AuthProvider>
  </Provider>
);
