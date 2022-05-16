import React from 'react'

export const Alert = (props) => {
  const { type, message } = props
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  )
}
