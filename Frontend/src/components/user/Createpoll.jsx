import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { sendCreatePollData } from '../services/home.services';
import dayjs from 'dayjs';

export default function Createpoll() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [answers, setAnswers] = useState(['']);
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const navigate = useNavigate();

    const CreatePollUser = data => {
        let answerArray = answers.map((_, index) => data[`answer${index + 1}`]);
        let senddata = {
            name: data.name,
            startdate: data.startdate,
            enddate: data.enddate,
            question: data.question,
            answer: answerArray
        };
        console.log(senddata);
        sendCreatePollData(senddata).then(r => {
            if (r?.code == 1) {
                toast.success('Poll Created Successfully..');
                navigate('/home');
            }
        });
    };

    const addAnswerField = () => {
        setAnswers([...answers, '']);
    };

    return (
        <>
            <div className='container'>
                <div className='row text-center'>
                    <h1>Create A Poll/Voting Here</h1>
                </div>

                <form className='border border-success rounded w-50 mx-auto py-4' onSubmit={handleSubmit(CreatePollUser)}>
                    <div className='row'>
                        <div className="form-group col-8 mx-auto">
                            <label htmlFor="name">Poll Name</label>
                            <input type="text" id="name" className="form-control" {...register('name', {
                                required: 'Please Enter Poll Name',
                                pattern: { value: /^[A-Za-z?]+([\s][A-Za-z?]+)*[A-Za-z?]{3,20}$/, message: 'Please Enter Only alphabets and length should be between 3 and 20.' },
                            })} placeholder='Enter Poll Name' />
                            <p style={{ color: 'red' }}>{errors.name?.message}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-8 mx-auto">
                            <label htmlFor="startdate">Poll Start Date</label><br />
                            <Controller
                                control={control}
                                name="startdate"
                                rules={{ required: 'Please Select Start Date' }}
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='select Start Date'
                                        className='form-control'
                                        selected={field.value}
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            setStartDate(formattedDate);
                                            field.onChange(formattedDate);
                                        }}
                                        minDate={new Date()}
                                        maxDate={endDate}
                                    />
                                )}
                            />
                           
                            <p style={{ color: 'red' }}>{errors.startdate && errors.startdate?.message}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-8 mx-auto">
                            <label htmlFor="enddate">Poll End Date</label>< br />
                            <Controller
                                control={control}
                                name="enddate"
                                rules={{ required: 'Please Select End Date' }}
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='select End Date'
                                        className='form-control'
                                        selected={field.value}
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            setEndDate(formattedDate);
                                            field.onChange(formattedDate);
                                        }}
                                        minDate={startDate}
                                    />
                                )}
                            />

                            <p style={{ color: 'red' }}>{errors.enddate && errors.enddate?.message}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-8 mx-auto">
                            <label htmlFor="question">Poll Question/Topic Name</label>
                            <input type="text" id="question" className="form-control" {...register('question', {
                                required: 'Please Enter Question',
                                pattern: { value: /^[\S]+([\s][\S]+)*[\S]$/, message: 'Spaces Are Not Allowed..' }
                            })} placeholder='Enter Question' />
                            <p style={{ color: 'red' }}>{errors.question?.message}</p>
                        </div>
                    </div>
                    {answers.map((answer, index) => (
                        <div className='row' key={index}>
                            <div className="form-group col-8 mx-auto">
                                <label htmlFor={`answer${index + 1}`}>Poll Answer {index + 1}</label>
                                <input type="text" id={`answer${index + 1}`} className="form-control" {...register(`answer${index + 1}`, {
                                    required: 'Please Enter Answer',
                                    pattern: { value: /^[\S]+([\s][\S]+)*[\S]$/, message: 'Spaces Are Not Allowed..' }
                                })} placeholder={`Enter Answer ${index + 1}`} />
                                <p style={{ color: 'red' }}>{errors[`answer${index + 1}`]?.message}</p>
                            </div>
                        </div>
                    ))}
                    <div className='row col-8 mx-auto'>
                      <center> <button type="button" className="btn btn-secondary" onClick={addAnswerField}>Add Answer</button></center>
                    </div>
                    <div className='row col-8 mx-auto'>
                        <center><button type="submit" className="btn btn-primary mt-3">Create Poll</button></center>
                    </div>
                </form>
            </div>
        </>
    )
}
