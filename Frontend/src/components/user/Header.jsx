import React from 'react'
import { UserLogout } from '../services/home.services';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { getUserDetailsSelector } from '../reducers/UserSlice';

export default function Header() {

    const location = useLocation();
    const path = '/' + location?.pathname?.split('/')?.[1];

    const User = useSelector(getUserDetailsSelector);
    console.log(User);
    const navigate = useNavigate();

    function Logout() {
        UserLogout().then(r => {
            console.log("logout");
            if (r?.code == 1) {
                localStorage.removeItem('User_model');
                toast.success(r?.data);
                navigate('/login');
            }
        })
    }
    console.log(path);
    if (path !== '/login' && path !== '/register' && path !== '/' && path !== '/loginex') {
        return (
            <>
                <div className='container'>
                    <div className='row mt-2'>
                        <div className='col-6'>
                            <h3>Welcome: {User?.first_name}</h3>
                        </div>
                        <div className='col-6 text-end'>
                            <>
                                <button className='btn btn-primary ms-2' onClick={()=> navigate('/home')}>Home Page</button>
                                <button className='btn btn-warning ms-2' onClick={() => Logout()}>Logout</button>
                            </>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </>
        )
    }
    else {
       return(
        <></>
       )
    }
}
