// import React, { useEffect, useReducer, useState } from 'react'
// import { deletePollU, getMyPollResult, getMyPolls } from '../services/home.services';
// import useCountdown from './useCountdown';
// import Swal from 'sweetalert2';

// export default function Mypolls() {

//   const [pollData, setPollData] = useState([]);
//   const [pollDataAnswer, setPollDataAnswer] = useState([]);
//   const [deletedPoll, setDeletedPoll] = useState(false);

//   useEffect(() => {
//     getMyPolls().then(r => {
//       if (r?.code == 1) {
//         setPollData(r?.data);
//       }
//     })
//   }, [deletedPoll])

//   useEffect(() => {
//     getMyPollResult().then(r => {
//       if (r?.code == 1) {
//         setPollDataAnswer(r?.data);
//       }
//     })
//   }, [deletedPoll])


//   function deletePoll(pollid) {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Are you Sure Want to Delete this Poll!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deletePollU({ poll_id: pollid }).then(r => {
//           if (r.code == 1) {
//             setDeletedPoll((prev) => !prev);
//             Swal.fire({
//               title: "Deleted!",
//               text: "Poll has been Deleted Successfully.",
//               icon: "success"
//             });
//           }
//         })
//       }
//     });

//   }

//   function isPollExpired(endDate) {
//     const currentDate = new Date();
//     const pollEndDate = new Date(endDate);
//     currentDate.setHours(0, 0, 0, 0);
//     pollEndDate.setHours(0, 0, 0, 0);

//     return pollEndDate < currentDate;
//   }

//   return (
//     <>
//       <div className='container'>
//         <div className='row'>
//           {pollData.length > 0 ?
//             pollData.map((v, i) => {
//               // const remainingTime = useCountdown(v?.end_time);
//               return (
//                 <div className="col-sm-6 mt-2" key={i}>
//                   <div className="card">
//                     <div className="card-body">
//                       <h5 className="card-title text-center">{v?.name}</h5>
//                       <h4 className="card-title">{v?.question}</h4>
//                       {pollDataAnswer
//                         .filter(va => va?.poll_id === v?.poll_id)
//                         .map((va, ia) => (
//                           <h4 key={ia}>{va?.answer}: {va?.counted}</h4>
//                         ))}
//                       <h6 className='card-text mt-2'>End Time: {v?.end_time}</h6>
//                       {isPollExpired(v?.end_time) && (
//                         <h6 className='text-danger'>Poll is expired</h6>
//                       )}
//                       <h6 className='text-center'>
//                         <button className='btn btn-danger' onClick={() => deletePoll(v?.poll_id)}>Delete Poll</button>
//                       </h6>
//                     </div>
//                   </div>
//                 </div>
//               );
//             }) : (
//               <div className='row text-center mt-5'>
//                 <div className='col-12 alert alert-warning mt-5'>No Polls Found</div>
//               </div>
//             )}
//         </div>
//       </div>
//     </>
//   )
// }


import React, { useEffect, useState } from 'react';
import { deletePollU, getMyPollResult, getMyPolls } from '../services/home.services';
import Swal from 'sweetalert2';
import PollItem from './PollItem'; 

export default function Mypolls() {
  const [pollData, setPollData] = useState([]);
  const [pollDataAnswer, setPollDataAnswer] = useState([]);
  const [deletedPoll, setDeletedPoll] = useState(false);

  useEffect(() => {
    getMyPolls().then(r => {
      if (r?.code == 1) {
        setPollData(r?.data);
      }
    });
  }, [deletedPoll]);
    
  useEffect(() => {
    getMyPollResult().then(r => {
      if (r?.code == 1) {
        setPollDataAnswer(r?.data);
      }
    });
  }, [deletedPoll]);

  function deletePoll(pollid) {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this poll?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deletePollU({ poll_id: pollid }).then(r => {
          if (r.code == 1) {
            setDeletedPoll((prev) => !prev);
            Swal.fire({
              title: "Deleted!",
              text: "Poll has been deleted successfully.",
              icon: "success"
            });
          }
        });
      }
    });
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          {pollData.length > 0 ? (
            pollData.map((v, i) => (
              <PollItem
                key={i}
                poll={v}
                answers={pollDataAnswer}
                onDelete={deletePoll}
              />
            ))
          ) : (
            <div className='row text-center mt-5'>
              <div className='col-12 alert alert-warning mt-5'>No Polls Found</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
