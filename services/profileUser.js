const storage = require("../config/cloudStorage");

const uploadToFirebaseStorage = async (filepath, fileName) => {
    try {

        const gcs = storage.bucket("gs://capstone-project-c241-ps162.appspot.com");
        const storagepath = `profile/${fileName}`;

        const result = await gcs.upload(filepath, {
            destination: storagepath,
            public: true,
            metadata: {
                contentType: "image/jpeg",
                cacheControl: "public, max-age=31536000",
            },
        });
        return result[0].metadata.mediaLink;

    } catch (error) {

        console.log(error);
        throw new Error(error.message);

    }
}

module.exports = uploadToFirebaseStorage;