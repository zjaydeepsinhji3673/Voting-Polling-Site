import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function Loginex() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-10 border mx-auto'>
                        <div className='row'>
                            <div className='col-6 p-4'>
                                <img src='http://localhost:3000/images/vote.png' style={{ height: '474px', width: '420px' }}></img>
                            </div>
                            <div className='col-6 p-4'>
                                <div className='row text-center'>
                                    <h1>Login Here</h1>
                                </div>
                                <div className='row mt-5'>
                                    <div className='row'>
                                        <div className="form-group col-12 mx-auto mt-2">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" className="form-control" {...register('email', {
                                                required: 'Please Enter Email',
                                                pattern: { value: /^[a-zA-Z0-9]+[._-]*[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Please Enter Valid Email' },
                                            })} placeholder='Enter Your Email' />
                                            <p style={{ color: 'red' }}>{errors.email?.message}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="form-group col-12  mx-auto">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" className="form-control" {...register('password', {
                                                required: 'Please Enter Password',
                                                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/, message: 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Characte' }
                                            })} placeholder='Enter Your Password' />
                                            <p style={{ color: 'red' }}>{errors.password?.message}</p>
                                        </div>

                                    </div>
                                    <div className='row col-12 mx-auto'>
                                        <center><button type="submit" className="btn btn-primary login-btn mt-1 mb-2">Login</button><br />
                                            Don't Have An Account ?<Link to='/register'> Register Here</Link></center>
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
