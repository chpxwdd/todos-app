import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { TodoListPage } from './pages/TodoListPage'
import { TodoCreatePage } from './pages/TodoCreatePage'
import { UserLoginPage } from './pages/UserLoginPage'
import Navbar from './components/Nav/Navbar'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="mt-5">
          <div className="container">
            <Routes>
              <Route path="/" exact element={<DashboardPage />}></Route>
              <Route path="/dashboard" exact element={<DashboardPage />}></Route>
              <Route path="/todo/list" exact element={<TodoListPage />}></Route>
              <Route path="/todo/create" exact element={<TodoCreatePage />}></Route>
              <Route path="*" element={<Navigate to="/" replace />} />
              {/* <Route path="/todo/read/:id" exact element={<TodoReadPage />}></Route> */}
            </Routes>
          </div>
        </main>
      </>
    )
  }

  return (
    <main className="mt-5">
      <div className="container">
        <Routes>
          <Route path="/" exact element={<UserLoginPage />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>
  )
}
