import express from 'express';
import bodyParser from 'body-parser';
import { VertexAI } from '@google-cloud/vertexai';
import multer from 'multer';

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('App is running on', port);
})

const upload = multer({ storage: multer.memoryStorage() });

app.post('/generate', upload.single('audio'), async (req, res) => {
    const audioFile = req.file;
    const word = req.body.word;
    console.log('audio file: ' + audioFile);
    console.log('word: ' + word);

    const base64audio = audioFile.buffer.toString('base64');
    try {
        const vertex_ai = new VertexAI({ project: 'speaktoo-api', location: 'asia-southeast1' });
        const model = 'gemini-1.5-flash-001';

        // Instantiate the models
        const generativeModel = vertex_ai.preview.getGenerativeModel({
            model: model,
            generationConfig: {
                'maxOutputTokens': 4000,
                'temperature': 0.5,
                'topP': 0.95,
            },
            safetySettings: [
                {
                    'category': 'HARM_CATEGORY_HATE_SPEECH',
                    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
                },
                {
                    'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
                },
                {
                    'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
                },
                {
                    'category': 'HARM_CATEGORY_HARASSMENT',
                    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
                }
            ],
        });

        const audio1 = {
            inlineData: {
                mimeType: 'audio/wav',
                data: base64audio
            }
        };
        const text1 = { text: 'you are an English teacher. how do you pronounce "'+ word +'" give me a brief explanation' };

        async function generateContent() {
            const req = {
                contents: [
                    { role: 'user', parts: [audio1, text1] }
                ],
            };

            const streamingResp = await generativeModel.generateContentStream(req);
            let aggregatedResponse = '';

            for await (const item of streamingResp.stream) {
                if (item && item.candidates) {
                    item.candidates.forEach(candidate => {
                        if (candidate.content && candidate.content.parts) {
                            candidate.content.parts.forEach(part => {
                                if (part.text) {
                                    aggregatedResponse += part.text;
                                }
                            });
                        }
                    });
                }
            }

            console.log('aggregated response: ' + aggregatedResponse);
            return aggregatedResponse;
        }

        const response = await generateContent();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
})