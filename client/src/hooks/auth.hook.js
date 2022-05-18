import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  const login = useCallback((data) => {
    const { token, user, role } = data
    setToken(token)
    setRole(role)
    setUser(user)

    localStorage.setItem(storageName, JSON.stringify(data))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    setRole(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token && data.user && data.role) login(data)
    setReady(true)
  }, [login])

  return { login, logout, token, user, role, ready }
}