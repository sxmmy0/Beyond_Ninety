import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"

interface User {
  id: number
  email: string
  username: string
}


const tips = [
  "Consistency is the secret weapon of champions.",
  "Visualise your success before each session.",
  "Recovery is training too — sleep like a pro.",
  "Win the mornings, win the match.",
  "Train at match intensity — always."
]

export default function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [tip, setTip] = useState("")

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me")
        setUser(res.data)
      } catch (err) {
        console.error("Failed to fetch user:", err)
        logout()
        navigate("/login")
      }
    }

    fetchUser()
  }, [])

return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {user?.username} 👊</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Tip of the Day */}
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 rounded mb-6">
        <p className="font-semibold">Tip of the Day:</p>
        <p>{tip}</p>
      </div>

      {/* Training Streak */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-2">🔥 Your Training Streak</h2>
        <p>5-day streak! Keep the momentum going!</p>
      </div>

      {/* Avatar Progress */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-2">🧍 Avatar Progress</h2>
        <p>Speed: 70% | Endurance: 85% | Agility: 60%</p>
        <p className="text-sm text-gray-500">Based on your last 2 weeks of drills.</p>
      </div>

      {/* Weekly Goals */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">📆 Weekly Goals</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>Train 4 times this week ✅</li>
          <li>Book 1 session with Coach 🔄</li>
          <li>Post progress photo 📸</li>
        </ul>
      </div>
    </div>
  )
}

