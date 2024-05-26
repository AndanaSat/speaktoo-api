const auth = require('../config/firebase');
const { signInWithEmailAndPassword } = require('firebase/auth');

async function loginEmail(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return {
            'uid': userCredential.user.uid,
            'email': userCredential.user.email
        }
    } catch (error) {
        console.log(error.message)
        return {
            'status': 'fail',
            'message': 'Terjadi kesalahan silahkan cek kembali email dan password anda'
        };
    }
}

module.exports = loginEmail;