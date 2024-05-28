const express = require('express');
const router = express.Router();
const { 
    getWord, 
    loginUser, 
    signupUser, 
    updateProgress,  
    getWordsByDifficulty, 
    postLogs 
} = require('./handler');

router.get('/', (req, res) => {
    res.send('Hello World!');
})

// User Progress and Authentication
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
          'status': 'fail',
          'message': 'Harap maklum'
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
            'status': 'fail',
            'message': 'Harap maklum'
        }).status(500);
    }
})

router.put('/user/progress', async (req, res) => {
    let user_id = req.body.uid;
    let progress = req.body.progress;
    try {
        const data = await updateProgress(user_id, progress);
        res.status(200);

        if(data.status === 'fail'){
            res.status(400);
        }

        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({
            'status': 'fail',
            'message': 'harap maklum'
        }).status(500);
    }
})

// Function APPS
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

router.get('/words/:difficulty', async(req, res) => {
    let user_id = req.body.uid;
    let { difficulty } = req.params;
    try {
        const data = await getWordsByDifficulty(user_id, difficulty);
        res.status(200);

        if(data.status === 'fail'){
            res.status(404);
        }

        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({
            'status': 'fail',
            'message': 'harap maklum'
        }).status(500);
    }
})

// User Logs
router.post('/user/logs', async(req, res) => {
    let user_id = req.body.uid;
    let word_id = req.body.wid;

    try {
        const data = await postLogs(user_id, word_id);

        if(data.status === 'fail'){
            res.status(400);
        }

        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({
            'status': 'fail',
            'message': 'harap maklum'
        }).status(500);
    }
})

module.exports = router;

