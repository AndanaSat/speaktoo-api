const { auth } = require('../config/firebase');
const { signInWithEmailAndPassword } = require('firebase/auth');

async function loginEmail(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        return error;
    }
}

module.exports = loginEmail;