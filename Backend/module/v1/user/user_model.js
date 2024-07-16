const conn = require('../../../config/database');
const common = require('../../../config/common');
const md5 = require('md5');
const auth_model = {

    login: function (req, callback) {
        let token = common.generateToken(10);
        var data = req.body;
        conn.query(`select * from tbl_user where  email = ? ;`, [data.email], function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                if (result.length > 0) {
                    if (result[0].password == md5(data.password)) {
                        if (result[0].is_active == 1) {

                            conn.query(`update tbl_user set token = ? where id = ?`, [token, result[0].id], function (error1, result1) {
                                if (error1) {
                                    callback('0', 'Error', error1);
                                }
                                else {
                                    conn.query(`select * from tbl_user where id = ?`, [result[0].id], function (error2, result2) {
                                        if (error2) {
                                            callback('0', 'Error', error2);
                                        }
                                        else {
                                            callback('1', 'Success', result2[0]);
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            callback('3', 'Error', 'In Active User')
                        }
                    }
                    else {
                        callback('0', 'Error', 'Your Entered Passwrod is Wrong, Please Enter Currect Password')
                    }
                }
                else {
                    callback('0', 'Error', 'Your Entered Email is Wrong, Please Enter Currect Email')
                }
            }
        })
    },

    register: function (req, callback) {
        var data = req.body
        common.CheckUnique(data, function (unique_values) {
            if (unique_values != null && unique_values.length > 0) {
                callback('0', 'error', unique_values);
            }
            else {
                let userdata = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: md5(data.password),
                    token: common.generateToken(15),
                }
                conn.query(`insert into tbl_user set ?;`, [userdata], function (error, result) {
                    if (error) {
                        callback('0', 'Error', error);

                    }
                    else {
                        conn.query(`select * from tbl_user where id = ?`, [result.insertId], function (error1, UserModel) {
                            if (error1) {
                                callback('0', 'Error', error1);

                            }
                            else {
                                callback('1', 'Success', UserModel);
                            }
                        })
                    }
                })
            }
        })
    },

    logout: function (req, callback) {
        conn.query(`update tbl_user set token = null where id = ?`, [req.user_id], function (error, result) {
            if (error) {
                callback('0', 'Error', error)
            }
            else {
                callback('1', 'Success', 'Logout Successyfully..');
            }
        })
    },

    // create_poll:function(req, callback){
    //     let data = req.body
    //     let poll = {
    //         name:data.name,
    //         start_time:data.startdate,
    //         end_time:data.enddate
    //     }
    //    conn.query(`insert into tbl_poll set ?`,[poll],function(error,result){
    //     if(error){
    //         callback('0','Error',error)
    //     }
    //     else{
    //         let question = {
    //             question:data.question,
    //             poll_id:result.insertId
    //         }
    //        conn.query(`insert into tbl_questions set ?`,[question],function(error1,result1){
    //             if(error1){
    //                 console.log(error1)
    //                 callback('0','Error',error1)
    //             }
    //             else{
    //                 Promise.all(data.answer.map(async answername => {
    //                     let answerdata = {
    //                         poll_id:result.insertId,
    //                         question_id:result1.insertId,
    //                         answer:answername,
    //                     }
    //                     conn.query(`insert into tbl_answers set ?`, [answerdata])
    //                 })).then(result3 => callback('1','Success','poll Created..'))
    //                 .catch(error3=>
    //                     console.log(error3),
    //                     callback('0','Error',error3))
    //             }
    //        })
    //     }
    //    })
    // }
     create_poll:function(req, callback) {
        let data = req.body;
    
        let poll = {
            user_id:req.user_id,
            name: data.name,
            start_time: data.startdate,
            end_time: data.enddate
        };
        conn.query(`insert into tbl_poll set ?`, [poll], function(error, result) {
            if (error) {
                return callback('0', 'Error', error);
            } else {
                let question = {
                    question: data.question,
                    poll_id: result.insertId
                };
    
                conn.query(`insert into tbl_questions set ?`, [question], function(error1, result1) {
                    if (error1) {
                        console.log(error1);
                        return callback('0', 'Error', error1);
                    } else {
                        // Insert answers using Promise.all
                        Promise.all(data.answer.map(answername => {
                            return new Promise((resolve, reject) => {
                                let answerdata = {
                                    poll_id: result.insertId,
                                    question_id: result1.insertId,
                                    answer: answername
                                };
                                conn.query(`insert into tbl_answers set ?`, [answerdata], function(error2) {
                                    if (error2) {
                                        console.log(error2)
                                        reject(error2);
                                    } else {
                                        resolve();
                                    }
                                });
                            });
                        }))
                        .then(() => {
                            callback('1', 'Success', 'Poll Created.');
                        })
                        .catch(error3 => {
                            console.log(error3);
                            callback('0', 'Error', error3);
                        });
                    }
                });
            }
        });
    },

    voting:function(req, callback){
        conn.query(`SELECT p.*,q.question as que FROM tbl_poll p JOIN tbl_questions q ON q.poll_id = p.id WHERE p.start_time <= CURRENT_DATE AND p.end_time >= CURRENT_DATE AND p.is_active = 1`,function(error,result){
            if(error){
                callback('0','error',error)
            }
            else{
                callback('1','Success',result);
            }
        })
    },

    voting_answer:function(req,callback){
        conn.query(`select * from tbl_answers`,function(error,result){
            if(error){
                callback('0','error',error)
            }
            else{
                callback('1','Success',result);
            }
        })
    },

    answer_for_post:function(req, callback){
        let data = req.body;
        let ans = data.answer;
        conn.query(`select * from tbl_results where poll_id = ? and user_id = ?`,[data.poll_id, req.user_id],function(error,result){
            if(error){
                callback('0','Error',error)
            }
            else{
                if(result.length > 0){
                    let resultupdate = {
                        question_id:data.question_id,
                        answer_id:data.id
                    }
                    conn.query(`update tbl_results set ? where user_id = ? and poll_id = ?`,[resultupdate,req.user_id,req.body.poll_id],function(error1,result2){
                        if(error1){
                            callback('0','Error',error1)
                        }
                        else{
                            callback('1','Success',`Vote Given Successfully for ${ans}`)
                        }
                    })
                }
                else{
                    let Resultinsert = {
                        user_id:req.user_id,
                        poll_id:data.poll_id,
                        question_id:data.question_id,
                        answer_id:data.id
                    }
                    conn.query(`insert into tbl_results set ?`,[Resultinsert],function(error2,result2){
                        if(error2){
                            callback('0','Error',error2)
                        }
                        else{
                            callback('1','Success',`Vote Given Successfully for ${ans}`);
                        }
                    })
                }
            }
        })
    },

    get_counts:function(req, callback){
        conn.query(`SELECT COUNT(id) as total_poll FROM tbl_poll WHERE start_time <= CURRENT_DATE AND end_time >= CURRENT_DATE AND is_active = 1; 
        SELECT COUNT(id) as yours_total_active_poll FROM tbl_poll WHERE start_time <= CURRENT_DATE AND end_time >= CURRENT_DATE AND user_id = ? AND is_active = 1;
        SELECT COUNT(id) as yours_total_poll FROM tbl_poll WHERE user_id = ? AND is_active = 1;`,[req.user_id,req.user_id],function(error,result){
            if(error){
                callback('0','error',error)
            }
            else{
                callback('1','Success',result);
            }
        })
    },

    my_polls:function(req, callback){
        conn.query(`SELECT p.*,q.* FROM tbl_poll p JOIN tbl_questions q ON q.poll_id = p.id WHERE p.user_id = ? AND p.is_active = 1;`,[req.user_id],function(error,result){
            if(error){
                callback('0','error',error)
            }
            else{
                callback('1','Success',result);
            }
        })
    },
 

    my_poll_result:function(req, callback){
        conn.query(` SELECT a.*,COUNT(r.answer_id) as counted FROM tbl_answers a JOIN tbl_results r ON r.answer_id = a.id GROUP BY a.id;`,function(error,result){
            if(error){
                callback('0','error',error)
            }
            else{
                callback('1','Success',result);
            }
        })
    },

    delete_poll:function(req, callback){
        conn.query(`update tbl_poll set is_active = 2 where id = ?`,[req.body.poll_id],function(error,result){
            if(error){
                callback('0','error',error)
            }
            else{
                callback('1','Success','Poll deleted Successfully...');
            }
        })
    }
}
module.exports = auth_model;