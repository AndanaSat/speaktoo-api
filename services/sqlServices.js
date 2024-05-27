const db = require('../config/sqlConfig');

async function postUserProgress(user_id, username, callback){
    try {
        const sql = 'INSERT INTO user_progress (user_id, username, progress) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [user_id, username, 0]);
        return result.username;
    } catch (error) {
        console.log(error.message);
        return 'fail';
    }
}

async function getUserProgress(user_id){
    try{
        const sql = 'SELECT * FROM user_progress WHERE user_id = ?';
        const [result] = await db.query(sql, [user_id]);
        return result;
    } catch (error) {
        console.log(error.message);
        return 'fail';
    }
    
}

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
        console.log(error.message);
        return 'fail';
    }
}

module.exports = { postUserProgress, getUserProgress, updateUserProgress };
