import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { UserLoginForm } from '../../components/Forms/UserLoginForm'

export const UserLoginPage = () => {
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => clearError(), [error, clearError])

  const changeHandler = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const loginHandler = async () => {
    const data = await request('/api/auth/login', 'POST', { ...form })
    console.log('data form resizeBy', data)
    auth.login(data.token, data.user, data.role)
  }

  return (
    <section className="user-login_form row">
      <UserLoginForm loading={loading} changeHandler={changeHandler} loginHandler={loginHandler} form={form} />
    </section>
  )
}
