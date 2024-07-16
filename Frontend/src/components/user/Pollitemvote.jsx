import React from 'react';
import useCountdown from './useCountdown'; 

function Pollitemvote({key, poll, answers, onAnswerGiven }) {
  const remainingTime = useCountdown(poll?.end_time);

  const isPollExpired = (endDate) => {
    const currentDate = new Date();
    const pollEndDate = new Date(endDate);

    currentDate.setHours(0, 0, 0, 0);
    pollEndDate.setHours(0, 0, 0, 0);

    return pollEndDate < currentDate;
  };

  return (
    <div className="col-sm-6 mt-2" key={key}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">{poll?.name}</h5>
          <h4 className="card-title">{poll?.que}</h4>
          {answers
            .filter(va => va?.poll_id === poll?.id)
            .map((va, ia) => (
              <button key={ia} className='btn btn-primary ms-2 answerbutton' onClick={() => onAnswerGiven(va)}>
                {va?.answer}
              </button>
            ))}
          <h6 className='card-text mt-2'>End Time: {poll?.end_time}</h6>
          {isPollExpired(poll?.end_time) ? (
            <h6 className='text-danger'>Poll is expired</h6>
          ) : (
            remainingTime && (
              <h6 className='text-success'>
                Time remaining: {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s
              </h6>
            )
          )}
          <p className='result mt-2' style={{ color: 'red' }} id={`result${poll?.id}`}></p>
        </div>
      </div>
    </div>
  );
}

export default Pollitemvote;
