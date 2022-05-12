import React from "react";
import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { TodosPage } from "./pages/TodosPage";
import { UserRegisterPage } from "./pages/UserRegisterPage";
import { UserLoginPage } from "./pages/UserLoginPage";

export const useRoutes = (isAuthenticated) => {
  //   if (isAuthenticated) {
  return (
    <Routes>
      <Route path="/dashboard" exact element={<DashboardPage />}></Route>
      <Route path="/todos" exact element={<TodosPage />}></Route>
      <Route path="/user-register" exact element={<UserRegisterPage/>}></Route>
      <Route path="/user-login" exact element={ <UserLoginPage />}></Route>
    </Routes>
  );
  //   }

  //   return (
  //     <Switch>
  //       <Route path="/" exact>
  //         <AuthPage />
  //       </Route>
  //       <Redirect to="/" />
  //     </Switch>
  //   )
};
