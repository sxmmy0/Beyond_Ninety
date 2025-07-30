import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  token: string | null
  setToken: (token: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'))

  const logout = () => {
    setToken(null)
    localStorage.removeItem('access_token')
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)!

