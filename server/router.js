const express = require('express')
const router = express.Router()
const getWord = require('./handler')

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

module.exports = router;