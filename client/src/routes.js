import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { TodoListPage } from './pages/todo/TodoListPage'
import { TodoCreatePage } from './pages/todo/TodoCreatePage'
import { UserLoginPage } from './pages/user/UserLoginPage'
import { Navbar } from './components/navs/Navbar'
import { GeoCitiesPage } from './pages/geo/GeoCitiesPage'
import { GeoCountriesPage } from './pages/geo/GeoCountriesPage'
import { GeoRegionsPage } from './pages/geo/GeoRegionsPage'

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
              {/* <Route path="/todo/read/:id" exact element={<TodoReadPage />}></Route> */}
              <Route path="/geo/countries" exact element={<GeoCountriesPage />}></Route>
              <Route path="/geo/regions" exact element={<GeoCitiesPage />}></Route>
              <Route path="/geo/cities" exact element={<GeoRegionsPage />}></Route>
              <Route path="*" element={<Navigate to="/" replace />} />
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
