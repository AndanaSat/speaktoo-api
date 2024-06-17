import express from 'express';
import generateContent from '../AI/generative.js';
import multer from 'multer';
import { Buffer } from 'node:buffer';

const router = express.Router();

const upload = multer({ 
    storage: multer.memoryStorage() 
});

const fileBuffer = (base64file) => Buffer.from('base64', base64file);
router.get('/', async (req, res) => {
    res.send("Api Gen is working properly")
})

router.post('/generate', upload.any(), async (req, res) => {
    try{
        const base64file = req.body.audio;
        const word = req.body.word;
        const result = await generateContent(fileBuffer(base64file), word);

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