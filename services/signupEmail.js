const auth = require('../config/firebase');
const { createUserWithEmailAndPassword } = require('firebase/auth');

async function signupEmail(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {
            'uid': userCredential.user.uid,
            'email': userCredential.user.email
        };
    } catch (error) {
        console.log(error.message)
        return {
            'status': 'fail',
            'message': error.message
        };
    }
}
module.exports = signupEmail;
