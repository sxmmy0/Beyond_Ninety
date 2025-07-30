import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0">
      <div className="p-6 font-bold text-xl border-b border-gray-700">
        Beyond Ninety ⚽
      </div>
      <nav className="p-4 space-y-4 text-sm">
        <Link to="/dashboard" className="block hover:text-blue-400">🏠 Dashboard</Link>
        <Link to="/coach" className="block hover:text-blue-400">🎯 Find a Coach</Link>
        <Link to="/training" className="block hover:text-blue-400">🔥 Start Training</Link>
        <Link to="/profile" className="block hover:text-blue-400">👤 Profile</Link>
      </nav>
    </aside>
  )
}
