const express = require('express');
const router = express.Router();
const getWord = require('./handler');
const signupEmail = require('../services/signupEmail');
const loginEmail = require('../services/loginEmail');
const { postUserProgress, getUserProgress } = require('../services/sqlServices')

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.get('/word/:word', async (req, res) => {
    let { word } = req.params;
    try{
        const data = await getWord(word)
        res.status(200);

        if(data.status === 'fail'){
            res.status(404);
        }

        res.send(data);
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
        const userCredential = await loginEmail(email, password);
        await getUserProgress(userCredential.uid, (callback) => {
            res.status(200).send({
                status: 'success',
                message: 'Login berhasil',
                data: {
                    'uid': userCredential.uid,
                    'email': userCredential.email,
                    'username': callback.username,
                    'progress': callback.progress 
                }
            });
        })
    }catch(error){
        console.error(error);
        res.status(400).send({
          status: 'fail',
          message: 'Terjadi kesalahan silahkan cek kembali email dan password anda'
        });
    }
})

router.post('/email/signup', async (req, res)=>{
    let { email, password, username } = req.body;
    try{
        const userCredential = await signupEmail(email, password) 
        await postUserProgress(userCredential.uid, username, (callback) => {
            res.send({
                status: 'success',
                message: 'Signup berhasil',
                data: {
                    'uid': userCredential.uid,
                    'email': userCredential.email,
                    'username': callback
                }
            }).status(200);
        })
    }catch (error) {
        console.log(error)
        res.send({
            status: 'fail',
            message: error.message || 'Signup failed'
        }).status(400);
    }
})

module.exports = router;
