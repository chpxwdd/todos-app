import React from 'react'

export const AuthLoginForm = (props) => {
  const { loading, changeHandler, loginHandler, form } = props
  return (
    <form className="col-lg-4 col-md-8 col-sm-10 col-xs-10 offset-lg-4 offset-md-3 offset-sm-1 p-3">
      <h3 className="mb-5 text-center">Авторизация</h3>
      <div className="mb-3 row">
        <label htmlFor="email" className="col-sm-3 col-form-label">
          Email
        </label>
        <div className="col-sm-9">
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
        <label htmlFor="password" className="col-sm-3 col-form-label">
          Password
        </label>
        <div className="col-sm-9">
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
      <hr />
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-lg btn-primary justify-content-center"
          disabled={loading}
          onClick={loginHandler}
        >
          Sign in
        </button>
      </div>
      <div className="d-flex justify-content-between text-muted">
        <a href="/user/forgot-password" className="btn btn-sm btn-link">
          Forgot password
        </a>
        <a href="/user/register" className="btn btn-sm btn-link">
          Registration
        </a>
      </div>
    </form>
  )
}
