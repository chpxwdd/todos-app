import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { TodosPage } from "./pages/TodosPage";
import { UserRegisterPage } from "./pages/UserRegisterPage";
import { UserLoginPage } from "./pages/UserLoginPage";
import Navbar from "./components/Navbar";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="mt-5">
          <div className="container">
            <Routes>
              <Route path="/" exact element={<DashboardPage />}></Route>
              <Route path="/todos" exact element={<TodosPage />}></Route>
              {/* <Route path="/todo/:id" exact element={<TodoPage />}></Route> */}
            </Routes>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="mt-5">
      <div className="container">
        <Routes>
          <Route path="/" exact element={<UserLoginPage />}></Route>
        </Routes>
      </div>
    </main>
  );
};
