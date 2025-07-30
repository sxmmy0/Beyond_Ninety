import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './auth/Login'
import { useAuth } from './context/AuthContext'
import Register from './auth/Register'
import Dashboard from './pages/Dashboard'

const Coach = () => <div className="p-6">🎯 Coach Matching Page (coming soon)</div>
const Training = () => <div className="p-6">🔥 Training Page (coming soon)</div>
const Profile = () => <div className="p-6">👤 Profile Page (coming soon)</div>

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/coach" element={
          <ProtectedRoute>
            <Coach />
          </ProtectedRoute>
        } />
        <Route path="/training" element={
          <ProtectedRoute>
            <Training />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Redirect any unknown route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  )
}
