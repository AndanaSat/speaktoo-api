const axios = require('axios');

async function getWord(word) {
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;

    try{
        const response = await axios.get(url)
        const data = response.data;

        data.forEach((element) => {
            word = element.word;
            element.phonetics.forEach((phonetic) => {
                if(phonetic.audio != ''){
                    audio = phonetic.audio
                }
            })
            element.meanings.forEach((meaning) => {
                if(meaning.partOfSpeech === 'noun'){
                    definition = meaning.definitions[0].definition;
                }
            })
        });

        return {
            'status': 'success',
            'message': 'berhasil get',
            'data': {
                'word': word,
                'meaning': definition,
                'audio': audio
            }
        }
    }
    catch(error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': 'gagal get word'
        }
    }
}

module.exports = getWord;
