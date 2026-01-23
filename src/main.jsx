import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Register from './pages/Register'
import './index.css'
import Login from './pages/Login'
import CreateTuition from './pages/CreateTuition';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/create-tuition" element={<CreateTuition />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)