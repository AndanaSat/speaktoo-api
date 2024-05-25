const express = require('express');
const router = express.Router();
const getWord = require('./handler');
const signupEmail = require('../services/signupEmail');
const loginEmail = require('../services/loginEmail');

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.get('/word/:word', async (req, res) => {
    let { word } = req.params;
    try{
        await getWord(word, (data) => {
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
            'message': 'gagal get word'
        }).status(404);
    }
})

router.post('/email/login', async (req, res)=>{
    let { email, password } = req.body;
    try{
        await loginEmail(email, password, (userCredential) => {
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
        console.log(error)
    }
})

router.post('/email/signup', async (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;

    try {
        await signupEmail(email, password, (userCredential) => {
            res.send({
                status: 'success',
                message: 'Signup berhasil',
                data: userCredential
            }).status(200);
        })
    } catch (error) {
        res.status(400).send({ // Use 400 for bad request (e.g., invalid email)
            status: 'fail',
            message: error.message || 'Signup failed' // Provide informative message
        });
    }
})

module.exports = router;