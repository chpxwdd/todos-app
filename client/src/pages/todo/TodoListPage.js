import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Spinner } from '../../components/bootstrap/Spinner'
import { TodoList } from '../../components/todo/TodoList.js'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'

export const TodoListPage = () => {
  const [links, setLinks] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchTodos = useCallback(async () => {
    try {
      const fetched = await request('/api/todo/list', 'GET', null, {
        Authorization: token,
      })
      setLinks(fetched)
    } catch (e) {
      console.error('error: ', e)
    }
  }, [token, request])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) {
    return <Spinner />
  }

  return (
    <section>
      <h3>
        Todos page <p className="lead">details</p>
      </h3>
      <hr />
      <TodoList links={links} />
    </section>
  )
}
