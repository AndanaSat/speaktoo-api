import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import generateContent from './ai.js';

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

const upload = multer({ 
    storage: multer.memoryStorage() 
});

app.post('/generate', upload.single('audio'), async (req, res) => {
    try {
        const word = req.body.word;
        const audioFile = req.file;
        const base64file = audioFile.buffer.toString('base64');

        const responseFormat = {
            'word': 'the inputed word',
            'phonetics': 'the phonetics for the word',
            'feedback': 'an array with feedback of my pronunciation (the number of array is equal to the number of words that is inputted)'
        };

        const text1 = { text: `you're an English teacher. how do you pronounce "${word}" give me feedback on my pronunciation in the audio, please send a JSON response with this format: ${JSON.stringify(responseFormat)}` };

        const audio1 = {
            inlineData: {
                mimeType: 'audio/wav',
                data: base64file
            }
        };

        const result = await generateContent(audio1, text1);
        const cleanedJsonString = result.candidates[0].content.parts[0].text.replace(/```json\n|```/g, '');
        const response = JSON.parse(cleanedJsonString);

        res.status(200).json({
            'status': 'success',
            'result': response
        });

    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ status: 'fail', message: 'Error generating content' });
    }
});

app.listen(port, () => {
    console.log('App is running on', port);
})
