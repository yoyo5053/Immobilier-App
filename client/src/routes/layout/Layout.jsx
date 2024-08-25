import React, { useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import "./layout.scss"
import { AuthContext } from '../../context/AuthContext'

const Layout = () => {
  return (
    <div className="layout">
      <div>
        <Navbar/>
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

const RequireAuth = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    !currentUser ? (<Navigate to="/login"/>) :
    <div className="layout">
      <div>
        <Navbar/>
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

export {Layout, RequireAuth}