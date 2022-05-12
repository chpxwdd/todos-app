import React from "react";

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="/">
            Todos App
          </a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/todos">
                Todos list
              </a>
            </li>
          </ul>

          {/*
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        */}

          <ul class="navbar-nav d-flex">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="/user-register"
              >
                Sign In
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="user-login">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
