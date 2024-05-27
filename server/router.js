const express = require('express');
const router = express.Router();
const { getWord, loginUser, signupUser } = require('./handler');
const signupEmail = require('../services/signupEmail');
const loginEmail = require('../services/loginEmail');

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
    }catch (error) {
        res.send({
            'status': 'fail',
            'message': 'Harap maklum'
        }).status(500);
    }
})

router.post('/email/login', async (req, res)=>{
    let { email, password } = req.body;
    try{
        const data = await loginUser(email, password);
        res.status(201);

        if(data.status === 'fail'){
            res.status(404);
        }

        res.send(data);
    } catch (error){
        console.error(error);
        res.send({
          status: 'fail',
          message: 'Harap maklum'
        }).status(500);
    }
})

router.post('/email/signup', async (req, res)=>{
    let { email, password, username } = req.body;
    try{
        const data = await signupUser(email, password, username);
        res.status(201);

        if(data.status === 'fail'){
            res.status(400);
        }

        res.send(data);

    } catch (error) {
        console.log(error);
        res.send({
            status: 'fail',
            message: 'Harap maklum'
        }).status(500);
    }
})

module.exports = router;

