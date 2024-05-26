const mysql = require('mysql2');
const db = require('../config/sqlConfig');

async function postUserProgress(user_id, username, callback){
    const sql = 'INSERT INTO user_progress (user_id, username, progress) VALUES (?, ?, ?)';
    const query = db.query(sql, [user_id, username, 0], (error, result) => {
        if(error){
            console.log(error);
            callback ({
                'status': 'fail',
                'message':error.message,
            })
        } else {
            console.log(username)
            callback(username);
        }
    });
}

async function getUserProgress(user_id, callback){
    const sql = 'SELECT * FROM user_progress WHERE user_id = ?';
    const query = db.query(sql, [user_id], (error, result) => {
        if(error){
            console.log(error);
            callback ({
                'status': 'fail',
                'message':error.message,
            })
        } else {
            callback({
                'username': result[0].username,
                'progress': result[0].progress 
            });
        }
    });
}

module.exports = { postUserProgress, getUserProgress };