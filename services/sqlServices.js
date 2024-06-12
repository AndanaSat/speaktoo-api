const db = require('../config/sqlConfig');

async function updateUserProgress(user_id, progress){
    try {
        const sql = 'UPDATE user_progress SET progress = ? WHERE user_id = ?';
        await db.query(sql, [progress, user_id]);
        const result = {
            user_id,
            progress
        };
        return result;
    } catch (error) {
        console.log(error);
        return 'fail';
    }
}

async function getWords(difficulty){
    try {
        const sql = 'SELECT words.word_id, word FROM WORDS WHERE word_type = ?'
        const [result] = await db.query(sql, [difficulty]);
        return result;
    } catch (error) {
        console.log(error);
        return 'fail';
    }
}

async function getCompletedWords(user_id, difficulty){
    try {
        const sql = 'SELECT words.word, COALESCE(user_logs.completed, 0) AS completed FROM user_logs RIGHT JOIN words ON words.word_id = user_logs.word_id WHERE user_logs.user_id = ? AND words.word_type = ?';
        const [result] = await db.query(sql, [user_id, difficulty]);
        return result;
    } catch (error) {
        console.log(error);
        return 'fail';
    }
}

async function postUserLogs(user_id, word_id){
    try {
        const sql = 'INSERT INTO user_logs (user_id, word_id, completed) VALUES (?, ?, ?)';
        await db.query(sql, [user_id, word_id, 1]);
        return 'behasil post logs';
    } catch (error) {
        console.log(error);
        return 'fail';
    }
}

module.exports = { 
    updateUserProgress, 
    getWords, 
    getCompletedWords, 
    postUserLogs
};
