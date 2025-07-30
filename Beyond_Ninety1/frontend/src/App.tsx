import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './auth/Login'
import { useAuth } from './context/AuthContext'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <h1 className="text-2xl text-center mt-20 font-bold">Welcome to Beyond Ninety 🎯</h1>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}
