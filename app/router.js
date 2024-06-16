import express from 'express';
import useAI from '../AI/generative.js';
import multer from 'multer';
import { Buffer } from 'node:buffer';

const router = express.Router();

const upload = multer({ 
    storage: multer.memoryStorage() 
});

router.get('/', async (req, res) => {
    res.send("Api Gen is working properly")
})

router.post('/generate', upload.single('audio'), async (req, res) => {
    try{
        const audioFile = req.file;
        const word = req.body.word;
        const result = await useAI(audioFile, word);

        res.send({
            'status': 'success',
            'message': 'Content generated successfully',
            'result': result
        });
    } catch (error) {
        res.send({
            'status': 'error',
            'message': 'Something went wrong'
        });
        console.log(error);
    }
    
})

export default router;
