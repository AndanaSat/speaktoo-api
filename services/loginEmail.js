const auth = require('../config/firebase');
const { signInWithEmailAndPassword } = require('firebase/auth');

async function loginEmail(email, password, callback) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            callback ({
                'uid': userCredential.user.uid,
                'email': userCredential.user.email
            })
        })
        .catch((error) => {
            callback ({
                'status': 'fail',
                'message': 'Terjadi kesalahan silahkan cek kembali email dan password anda'
            });
        });
    } catch (error) {
        callback ({
            'status': 'fail',
            'message': 'Terjadi kesalahan silahkan cek kembali email dan password anda'
        });
    }
}
module.exports = loginEmail;