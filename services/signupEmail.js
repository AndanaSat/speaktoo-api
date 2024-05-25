const { auth } = require('../config/firebase');
const { createUserWithEmailAndPassword } = require('firebase/auth');

async function signupEmail(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        return error;
    }
}

module.exports = signupEmail;