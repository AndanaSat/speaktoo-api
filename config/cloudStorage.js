const { Storage } = require("@google-cloud/storage");
const path = require('path');

const pathKey = path.resolve('../serviceaccountkey.json')

const gcs = new Storage({

  projectId: "capstone-project-c241-ps162",
  keyFilename: pathKey,

});

module.exports = gcs;