import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { AuthLoginForm } from '../components/Forms/AuthLoginForm'

export const UserLoginPage = () => {
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    clearError()
  }, [error, clearError])
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <section className="user-login_form row">
      <AuthLoginForm loading={loading} changeHandler={changeHandler} loginHandler={loginHandler} form={form}/>
    </section>
  )
}
