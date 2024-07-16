// import React, { useEffect, useState } from 'react'
// import { AnswerforVote, PollData, PollDataAnswer } from '../services/home.services';

// export default function Vote() {

//     const [pollData, setPollData] = useState([]);
//     const [pollDataAnswer, setPollDataAnswer] = useState([]);
//     const [answer, setAnswer] = useState(false);

//     useEffect(() => {
//         PollData().then(r => {
//             if (r?.code == 1) {
//                 setPollData(r?.data)
//             }
//         })
//     }, [answer])
    

//     useEffect(()=>{
//         PollDataAnswer().then(r => {
//             if(r?.code == 1){
//                 setPollDataAnswer(r?.data);
//             }
//         })
//     },[answer])

//     function AnswerGiven(answer){
//         AnswerforVote(answer).then(r=>{
//             if(r?.code == 1){
//                 setAnswer((prev) => !prev);
//                 const resultElement = document.getElementById(`result${answer.poll_id}`);
//                 if (resultElement) {
//                     resultElement.innerHTML = `<div>${r?.data}</div>`;
//                 }
//             }
//         })
//     }
//     return (
//         <>
//             <div className='container'>
//                 <div className='row'>
//                     {pollData.length > 0 ?
//                         pollData.map((v, i) =>
                            
//                                 <div className="col-sm-6 mt-2" key={i}>
//                                 <div className="card">
//                                     <div className="card-body">
//                                         <h5 className="card-title text-center">{v?.name}</h5>
//                                         <h4 className="card-title">{v?.que}</h4>
//                                         {pollDataAnswer
//                                             .filter(va => va?.poll_id === v?.id)
//                                             .map((va, ia) => (
//                                                 <button key={ia} className='btn btn-primary ms-2 answerbutton' onClick={()=>AnswerGiven(va)}>{va?.answer}</button>
//                                             ))}
//                                         <h6 className='card-text mt-2'>End Time: {v?.end_time}</h6>
//                                         <p className='result mt-2' style={{color:'red'}} id={`result${v?.id}`}></p>
//                                     </div>
//                                 </div>
//                             </div>

//                         ) : (
//                             <div className='row text-center mt-5'>
//                                 <div className='col-12 alert alert-warning mt-5'>No Live Voting Found</div>
//                             </div>
//                         )}

//                 </div>
//             </div>
//         </>
//     )
// }


import React, { useEffect, useState } from 'react';
import { AnswerforVote, PollData, PollDataAnswer } from '../services/home.services';
import Pollitemvote from './Pollitemvote';

export default function Vote() {

  const [pollData, setPollData] = useState([]);
  const [pollDataAnswer, setPollDataAnswer] = useState([]);
  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    PollData().then(r => {
      if (r?.code == 1) {
        setPollData(r?.data);
      }
    });
  }, [answer]);

  useEffect(() => {
    PollDataAnswer().then(r => {
      if (r?.code == 1) {
        setPollDataAnswer(r?.data);
      }
    });
  }, [answer]);

  function AnswerGiven(answer) {
    AnswerforVote(answer).then(r => {
      if (r?.code == 1) {
        setAnswer(prev => !prev);
        const resultElement = document.getElementById(`result${answer.poll_id}`);
        if (resultElement) {
          resultElement.innerHTML = `<div>${r?.data}</div>`;
        }
      }
    });
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          {pollData.length > 0 ? (
            pollData.map((v, i) => (
              <Pollitemvote
                key={i}
                poll={v}
                answers={pollDataAnswer}
                onAnswerGiven={AnswerGiven}
              />
            ))
          ) : (
            <div className='row text-center mt-5'>
              <div className='col-12 alert alert-warning mt-5'>No Live Voting Found</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
