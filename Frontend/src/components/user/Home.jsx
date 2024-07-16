import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCounts } from '../services/home.services';

export default function Home() {

  const navigate = useNavigate();
  const [count, setCount] = useState([]);

  useEffect(()=>{
    getCounts().then(r=>{
      if(r?.code == 1){
        setCount(r?.data);
      }
    })
  },[])


  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <img src='http://localhost:3000/images/vote.png' style={{ height: '500px', width: '550px' }}></img>
          </div>
          <div className='col-6'>
            <div className='row'>
              <div className='col-12'>
                <div class="card" style={{ width: '18rem;', height: '160px' }}>
                  <div class="card-body">
                    <h5 class="card-title">Create A Poll/Voting</h5>
                    <h3 class="card-subtitle mb-2 mt-3"><button className='btn btn-primary' onClick={()=>{navigate('/create_poll')}}>Create Poll</button></h3>
                  </div>
                </div>
              </div>
              <div className='col-12 mt-2'>
                <div class="card" style={{ width: '18rem;', height: '160px' }}>
                  <div class="card-body">
                    <h5 class="card-title mt-2">Your All Polls: {count[2]?.[0]?.yours_total_poll}</h5>
                    <h5 class="card-title mt-3">Your Active Polls: {count[1]?.[0]?.yours_total_active_poll}</h5>
                    <h3 class="card-subtitle mb-2 mt-2"><button className='btn btn-primary' onClick={()=>{navigate('/my_polls')}}>View My Polls</button></h3>
                  </div>
                </div>
              </div>
              <div className='col-12 mt-2'>
                <div class="card" style={{ width: '18rem;', height: '160px' }}>
                  <div class="card-body">
                    <h5 class="card-title">Vote A live Voting</h5>
                    <h5 class="card-title mt-3">Active Polls: {count[0]?.[0]?.total_poll}</h5>
                    <h3 class="card-subtitle mt-3"><button className='btn btn-primary' onClick={()=>{navigate('/view_polls')}}>Vote</button></h3>
                  </div>
                </div>
              </div>  
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
