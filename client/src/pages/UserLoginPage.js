import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
// import {useMessage} from '../hooks/message.hook'
import { AuthContext } from "../context/AuthContext";

export const UserLoginPage = () => {
  const auth = useContext(AuthContext);
  // const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // message(error);
    clearError();
    // }, [error, message, clearError]);
  }, [error, clearError]);

  // useEffect(() => {
  //   window.M.updateTextFields();
  // }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      // message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <section className="user-login_form row">
      <form className="col-md-6 col-sm-10 offset-md-3 offset-sm-1 p-3">
        <h3 className="mb-5 text-center">Авторизация</h3>
        <div className="mb-3 row">
          <label for="email" class="col-sm-3 col-form-label">
            Email
          </label>
          <div class="col-sm-9">
            <input
              name="email"
              type="email"
              className="form-control form-control-lg"
              placeholder="email"
              disabled={loading}
              value={form.email}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="password" class="col-sm-3 col-form-label">
            Password
          </label>
          <div class="col-sm-9">
            <input
              name="password"
              type="password"
              className="form-control form-control-lg"
              placeholder="password"
              value={form.password}
              onChange={changeHandler}
              disabled={loading}
            />
          </div>
        </div>
        <div class="d-grid">
          <button
            type="submit"
            class="btn btn-lg btn-primary justify-content-center"
          >
            Sign in
          </button>
        </div>
        <div class="d-flex justify-content-between text-muted">
          <a href="/user/forgot-password" className="btn btn-sm btn-link">
            Forgot password
          </a>
          <a href="/user/register" className="btn btn-sm btn-link">
            Registration
          </a>
        </div>
      </form>
    </section>
  );
};
