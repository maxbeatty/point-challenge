const firebase = require("firebase");
require("firebase/auth");

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "point-challenge.firebaseapp.com",
  databaseURL: "https://point-challenge.firebaseio.com",
  projectId: "point-challenge",
  storageBucket: "",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
});

exports.auth = firebase.auth();
