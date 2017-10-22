"use strict";

const firebase = require('firebase-admin');

require('dotenv').config();

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const firebaseCalRef = firebase.database().ref('/calories');

const currentDateFirebaseCalories = (cb) => {
  return firebaseCalRef.orderByKey()
    .limitToLast(1)
    .on('value', cb);
};

module.exports = currentDateFirebaseCalories;
