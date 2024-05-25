const axios = require('axios')

async function getWord(word, callback) {
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
    await axios.get(url)
    .then((response) => {
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

        const formattedData = {
            'status': 'success',
            'message': 'berhasil get',
            'data': {
                'word': word,
                'meaning': definition,
                'audio': audio
            }
        };

        console.log(formattedData);
        callback(formattedData);
    })
    .catch((error) => {
        formattedData = {
            'status': 'fail',
            'message': 'gagal get word'
        }
        callback(formattedData);
    })
}

module.exports = getWord;