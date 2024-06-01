// Import the functions you need from the SDKs you need
const getApp = require("firebase/app");
const getAuth = require("firebase/auth");
const { getStorage, ref } = require("firebase/storage");
require('dotenv').config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const app = getApp.initializeApp(firebaseConfig);
const storage = getStorage();
const auth = getAuth.initializeAuth(app);


module.exports = { auth, storage};