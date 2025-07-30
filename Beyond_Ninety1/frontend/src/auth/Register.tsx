import { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/register', {
        email,
        username,
        password
      })
      alert('Registration successful! Please log in.')
      navigate('/login')
    } catch (err: any) {
      console.error('Registration error:', err.response?.data || err.message)
      setError(err.response?.data?.detail || 'Registration failed')
    }
  }

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-24 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register for Beyond Ninety</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Register
      </button>
    </form>
  )
}
