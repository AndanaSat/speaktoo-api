const auth = require('../config/firebase');
const { createUserWithEmailAndPassword } = require('firebase/auth');

async function signupEmail(email, password, callback) {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            callback({
                'uid': userCredential.user.uid,
                'email': userCredential.user.email
            })
        })
        .catch((error) => {
            callback ({
                'status': 'fail',
                'message': error.message || 'Signup failed'
            });
        })
    } catch (error) {
        callback ({
            'status': 'fail',
            'message': error.message || 'Signup failed'
        });
    }
}
module.exports = signupEmail;

