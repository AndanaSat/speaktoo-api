const getWordService = require('../services/getWordService');
const { 
    updateUserProgress, 
    getWords, 
    getCompletedWords, 
    postUserLogs
} = require('../services/sqlServices');

async function getWord(word) {
    try{
        const result = await getWordService(word);

        if(result === 'fail'){
            return {
                'status': 'fail',
                'message': 'gagal get word'
            };
        }

        return {
            'status': 'success',
            'message': 'berhasil get',
            'data': {
                'word': word,
                'audio': encodeURI('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=' + word),
                result
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

async function updateProgress(user_id, progress){
    try {
        const result = await updateUserProgress(user_id, progress);

        if(result === 'fail'){
            return {
                'status': 'fail',
                'message': 'gagal update progress'
            };
        }

        return {
            'status' : 'success',
	        'message' : 'berhasil update progress',
	        'data' : {
	            'uid' : result.user_id,
	            'progress' : result.progress
            }
        };

    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': 'gagal update progress'
        }        
    }
}

async function getWordsByDifficulty(user_id, difficulty) {
    try {
        const words = await getWords(difficulty);
        const completedWords = await getCompletedWords(user_id, difficulty);

        if(words === 'fail' || completedWords === 'fail') {
            return {
                'status': 'fail',
                'message': 'gagal get words by difficulty'
            };
        }

        const result = [];
        words.forEach(item => {
            const found = completedWords.find(element => element.word === item.word);
            const completed = found ? found.completed : 0;
            result.push({ ...item, completed });
        });

        console.log(result);

        return {
            'status' : 'success',
	        'message' : 'berhasil get words by difficulty',
	        'data' : result
        }
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': 'gagal get words by difficulty'
        }   
    }
}

async function postLogs(user_id, word_id){
    try {
        const result = await postUserLogs(user_id, word_id);

        if(result === 'fail'){
            return {
                'status': 'fail',
                'message': 'gagal post logs'
            };
        }

        return {
            'status': 'success',
	        'message': result
        };

    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': 'gagal post logs'
        }   
    }
}

module.exports = { 
    getWord, 
    updateProgress, 
    getWordsByDifficulty, 
    postLogs
};
