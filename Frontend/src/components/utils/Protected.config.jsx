import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'

export default function Protected() {

  if(!localStorage.getItem('User_model')){
    return < Navigate to={'/login'} replace />
  }

  return <Outlet />;
}
