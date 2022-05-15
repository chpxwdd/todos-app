import React, {useCallback, useContext, useEffect, useState} from 'react'
import { Loader } from '../components/Loader'
import { TodosList } from '../components/TodosList'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const TodosPage = () => {
  const [links, setLinks] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchTodos = useCallback(async () => {
    try {
      const fetched = await request('/api/todo/list', 'GET', null, {
        Authorization: token,
      })
      setLinks(fetched)
    } catch (e) {console.error("error: ", e)}
  }, [token, request])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && <TodosList links={links} />}</>
}
