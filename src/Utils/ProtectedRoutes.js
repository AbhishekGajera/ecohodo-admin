import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = (props) => {

    const user = localStorage.getItem("user")

    if(!user){
        return <Navigate to={"/login"} />
    }

  return (
    <div>
      {props.children}
    </div>
  )
}

export default ProtectedRoutes
