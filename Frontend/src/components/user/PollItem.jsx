import React, { useEffect } from 'react';
import useCountdown from './useCountdown'; 

function PollItem({ key, poll, answers, onDelete }) {
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
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title text-center">{poll?.name}</h5>
          <h4 className="card-title">{poll?.question}</h4>
          {answers
            .filter(va => va?.poll_id === poll?.poll_id)
            .map((va, ia) => (
              <h4 key={ia}>{va?.answer}: {va?.counted}</h4>
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
          <h6 className='text-center'>
            <button className='btn btn-danger' onClick={() => onDelete(poll?.poll_id)}>Delete Poll</button>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default PollItem;
