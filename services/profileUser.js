const { storage } = require('../config/firebase');
const { ref, uploadBytes } = require('firebase/storage');

async function uploadUserProfilePic(user_id, file, filename){
    try {
        const path = user_id + '/' + filename;
        const fileRef = ref(storage, path);

        await uploadBytes(fileRef, file);

        return 'berhasil upload profile picture';
    } catch (error) {
        console.log(error);
        return 'fail';
    }
};

module.exports = uploadUserProfilePic;