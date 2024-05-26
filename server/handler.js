const axios = require('axios');
const signupEmail = require('../services/signupEmail');
const loginEmail = require('../services/loginEmail');
const { postUserProgress, getUserProgress } = require('../services/sqlServices')

async function getWord(word) {
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;

    try{
        const response = await axios.get(url);
        const data = response.data;

        data.forEach((element) => {
            word = element.word;
            element.phonetics.forEach((phonetic) => {
                if(phonetic.audio != ''){
                    audio = phonetic.audio
                }
            });
            element.meanings.forEach((meaning) => {
                if(meaning.partOfSpeech === 'noun'){
                    definition = meaning.definitions[0].definition;
                }
            });
        });

        return {
            'status': 'success',
            'message': 'berhasil get',
            'data': {
                'word': word,
                'meaning': definition,
                'audio': audio
            }
        };
    }
    catch(error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': 'gagal get word'
        };
    }
}

// function Login And Fetch User Progress
async function loginUser(email, password){
    try{
        const userCredential = await loginEmail(email, password);
        const userCredentialSQL = await getUserProgress(userCredential.uid);
        return {
            status: 'success',
            message: 'Login berhasil',
            data: {
                'uid': userCredential.uid,
                'email': userCredential.email,
                'username': userCredentialSQL[0].username,
                'progress': userCredentialSQL[0].progress 
            }
        };
    }catch(error){
        console.error(error);
        return {
            status: 'fail',
            message: 'Terjadi kesalahan silahkan cek kembali email dan password anda'
        };
    }
}

async function signupUser(email, password, username){
    try {
        const userCredential = await signupEmail(email, password);
        const userCredentialSQL = await postUserProgress(userCredential.uid, username);

        return {
            "status": "success",
            "message": "Signup berhasil",
            "data": {
                'uid': userCredential.uid,
                'email': userCredential.email,
                'username': username
            }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'fail',
            message: 'Signup failed'
        };
    }
}

module.exports = { getWord, loginUser, signupUser };

