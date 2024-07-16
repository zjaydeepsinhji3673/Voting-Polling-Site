const express = require('express');
var router = express.Router();
const common = require('../../../config/common');
const user_model = require('./user_model');

router.post('/login', function (req, res) {
    user_model.login(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.post('/register', function (req, res) {
    user_model.register(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/logout', function (req, res) {
    user_model.logout(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.post('/create_poll',function(req,res){
    user_model.create_poll(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/voting',function(req,res){
    user_model.voting(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/voting_answer',function(req,res){
    user_model.voting_answer(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.post('/answer_for_post',function(req,res){
    user_model.answer_for_post(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/get_counts',function(req,res){
    user_model.get_counts(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    })
})

router.get('/my_polls',function(req,res){
    user_model.my_polls(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    })
})

router.get('/my_poll_result',function(req,res){
    user_model.my_poll_result(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    })
})

router.put('/delete_poll',function(req,res){
    user_model.delete_poll(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    })
})
module.exports = router;