const express = require('express');
const router = express.Router();
const multer = require('multer');

const { 
    getWord, 
    updateProgress,  
    getWordsByDifficulty, 
    postLogs
} = require('./handler');

const upload = multer({ 
    storage: multer.memoryStorage() 
});

router.get('/', (req, res) => {
    res.send('Hello World!');
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

router.post('/user/logs', async(req, res) => {
    let user_id = req.body.uid;
    let word_id = req.body.wid;

    try {
        const data = await postLogs(user_id, word_id);
        res.status(201);

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
