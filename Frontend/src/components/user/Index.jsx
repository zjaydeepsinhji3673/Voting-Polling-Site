import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {
    const navigate = useNavigate();
    return (
        <>
            <div className='container'>
                <div className='row mt-2'>
                    <div className='col-6'>
                        <img src='http://localhost:3000/images/vote.png' style={{ height: '500px', width: '550px' }}></img>
                    </div>
                    <div className='col-6 border'>
                        <h1 style={{color:'orangered'}}>Welcome to Voting / Polling World</h1>
                        <div className='row mt-4'>

                           <center>
                            <h3 style={{color:'chocolate'}}>Already Have an Account then Login Here..</h3>
                            <button className='btn btn-primary btn-lg' onClick={()=>navigate('/login')}>Login</button>
                            </center> 
                        </div>
                        <div className='row mt-3'>
                           <center>
                           <h3 style={{color:'chocolate'}}>Don't Have an Account then Register Here..</h3>
                            <button className='btn btn-primary btn-lg' onClick={()=>navigate('/register')}>Register</button></center> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
