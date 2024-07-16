import React from 'react'
import { Link } from 'react-router-dom'
import './../../App.css';
export default function P404() {
  return (
    <>
        <div className='container'>
        <div className='row text-center'>
            <h1>Page Not Found</h1>
            <Link to='/'>Back To Home Page</Link>
        </div>
        </div>
    </>
  )
}
