import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import Navbar from './components/Layout/Navbar'
import PrivateRoute from './components/Layout/PrivateRoute'
import Home from './components/pages/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './components/pages/Dashboard'
import React from 'react'
import './App.css'

function App() {
  return (
    <div className="body">
      <Router>
        <AuthProvider>
          <div className="container"> 
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
                />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
