// const {VertexAI} = require('@google-cloud/vertexai');
import {VertexAI} from '@google-cloud/vertexai';

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'speaktoo-api', location: 'asia-southeast1'});
const model = 'gemini-1.5-flash-001';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 4000,
    'temperature': 0.7,
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

async function generateContent(word) {
    const audio1 = {
      inlineData: {
        mimeType: 'audio/mpeg',
        data: '//OExAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      }
    };
    
    const text1 = {text: `\"you\'re an English teacher. how do you pronounce \"`+ word +`\" give me a brief explanation\"`};
    
    const req = {
      contents: [
        {role: 'user', parts: [audio1, text1]}
      ],
    };
    
  const streamingResp = await generativeModel.generateContentStream(req);

  return streamingResp.response;
}

export default generateContent;
