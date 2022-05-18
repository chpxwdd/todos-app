import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  const login = useCallback((token, user, role) => {
    console.log()
    setToken(token)
    setRole(role)
    setUser(user)

    localStorage.setItem(storageName, JSON.stringify({ user, role, token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    setRole(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const { token, user, role } = JSON.parse(localStorage.getItem(storageName))
    if (user && role && token) login(token, user, role)
    setReady(true)
  }, [login])

  return { login, logout, token, user, role, ready }
}
