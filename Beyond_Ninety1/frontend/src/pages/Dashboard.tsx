import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold mb-6">Welcome to your Beyond Ninety Dashboard ⚽</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}
