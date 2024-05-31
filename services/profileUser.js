const { storage } = require("../config/firebase");
const { ref, uploadBytes } = require("firebase/storage");
const path = require('path');

const uploadProfile = async (uid, file) => {
    try {
        const fileName = '1';
        // const storageRef = ref(storage, uid + '/' + fileName);
        // const fileLocation = await storageRef.uploadFile(file, fileName);
        // return({
        //     status: "success",
        //     message: "File uploaded successfully",
        //     data: {
        //         location: fileLocation,
        //     },
        // });

        // const fileName = file.originalname;
        const storageRef = ref(storage, "images/" + fileName);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    } catch (error) {
        console.error(error);
        return({
            status: "fail",
            message: "Internal server error",
        });
    }
}

module.exports = uploadProfile;