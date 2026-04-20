import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import Navbar from './components/Layout/Navbar'
import PrivateRoute from './components/Layout/PrivateRoute'
import Home from './components/pages/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './components/pages/Dashboard'
function App() {
  return (
    <Router>
      <AuthProvider>
        <div> 
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
  )
}

export default App
