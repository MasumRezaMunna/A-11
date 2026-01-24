import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Register from './pages/Register'
import './index.css'
import Login from './pages/Login'
import CreateTuition from './pages/CreateTuition';
import TutorDashboard from './pages/TutorDashboard';
import Layout from './components/Layout'
import TutorDetails from './pages/TutorDetails'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/create-tuition" element={<CreateTuition />} />
        <Route path="/dashboard" element={<TutorDashboard />} />
        <Route path="/tutor/:id" element={<TutorDetails />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
)