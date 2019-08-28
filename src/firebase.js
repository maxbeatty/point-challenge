const firebase = require("firebase");
const admin = require("firebase-admin");
require("firebase/auth");

const databaseURL = "https://point-challenge.firebaseio.com";

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "point-challenge.firebaseapp.com",
  databaseURL,
  projectId: "point-challenge",
  storageBucket: "",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
});

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_ADMIN_JSON)
  ),
  databaseURL
});

exports.firebase = firebase;
exports.admin = admin;
