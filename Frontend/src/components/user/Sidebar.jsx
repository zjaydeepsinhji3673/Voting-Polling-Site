import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div id='sidebar' style={{height: "calc( 100vh - 88px )"}}>
        <div className="row h-100">
            <div className="col-2 h-100">
                <div className='h-100 py-3' style={{backgroundColor: "var(--mid-blue)"}}>
                    <ul className='nav flex-column align-items-center'>
                        <li><Link className='nav-link' to={"/dashboard"}>Dashboard</Link></li>
                        <li><Link className='nav-link' to={"/my-services"}>My Services</Link></li>
                        <li><Link className='nav-link' to={"/my-bookings"}>My Bookings</Link></li>
                    </ul>
                </div>
            </div>
            <div className="col">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}
