import { useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      const token = res.data.access_token
      setToken(token)
      localStorage.setItem('access_token', token)
      navigate('/dashboard')
    } catch (err: any) {
        console.error("Login failed:", err.response?.data || err.message)
        alert("Login failed: " + (err.response?.data?.detail || "Unknown error"))
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-24 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login to Beyond Ninety</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>
      <p className="text-sm mt-4 text-center">
        Don’t have an account? <a href="/register" className="text-blue-600 underline">Register here</a>
      </p>
    </form>
  )
}
