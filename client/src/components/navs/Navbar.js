import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const Navbar = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-sm  navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#appNavbarToggler"
          aria-controls="appNavbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="appNavbarToggler">
          <span className="navbar-brand" href="/">
            Todos App
          </span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/todo/list" className="nav-link">
                List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/todo/create" className="nav-link">
                Add
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                href=""
                id="navbarDropdownGeo"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                GeoNames Tools
              </span>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownGeo">
                <li>
                  <NavLink to="/geo/countries" className="dropdown-item">
                    Countries
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/geo/regions" className="dropdown-item">
                    Regions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/geo/cities" className="dropdown-item">
                    Cities
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav d-flex">
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
