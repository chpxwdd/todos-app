import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { Spinner } from './components/bootstrap/Spinner'
import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './routes'
// import './styles/todos.scss'

export const App = () => {
  const { token, login, logout, user, role, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Spinner />
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        user,
        role,
        isAuthenticated,
      }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  )
}
