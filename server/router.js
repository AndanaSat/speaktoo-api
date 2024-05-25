const express = require('express')
const router = express.Router()
const getWord = require('./handler')
const bodyParser = require('body-parser')
const {loginEmail} = require('../services/loginEmail') // Login Function
const {signupEmail} = require('../services/signupEmail') // Signup Function

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.get('/word/:word', (req, res) => {
    let { word } = req.params;
    try{
        getWord(word, (data) => {
            res.status(200);

            if(data.status === 'fail'){
                res.status(404);
            }

            res.send(data);
        });
    }
    catch(error){
        res.send({
            'status': 'fail',
            'messagge': 'gagal get word'
        }).status(404);
    }
})

router.post('/email/login', (req, res)=>{
    let { email, password } = req.body;
    try{
        loginEmail(email, password)
        .then((userCredential) => {
            // res.send(userCredential).status(200);
            res.send({
                status: 'success',
                message: 'Login berhasil',
                data: userCredential
            }).status(200);
        })
    } catch (error) {
        res.send({
            'status': 'fail',
            'message': 'Terjadi kesalahan silahkan cek kembali email dan password anda'
        }).status(404);
    }
})

router.post('/email/signup', (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    try{
        signupEmail(email, password)
        .then((userCredential) => {
            // res.send(userCredential).status(200);
            res.send({
                status: 'success',
                message: 'Signup berhasil',
                data: userCredential
            }).status(200);
        })

    } catch (error) {
        res.send({
            'status': 'fail',
            'message': 'Terjadi kesalahan silahkan cek kembali email dan password anda'
        }).status(404);
    }
})


module.exports = router;