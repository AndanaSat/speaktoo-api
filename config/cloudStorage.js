const { Storage } = require("@google-cloud/storage");

const storage = new Storage({

  projectId: "capstone-project-c241-ps162",
  keyFilename: "./serviceAccountKey.json",

});

module.exports = storage;