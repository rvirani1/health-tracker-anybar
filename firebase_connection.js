var firebase = require('firebase-admin');
var moment = require('moment-timezone');

require('dotenv').config();

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

var firebaseCalRef = firebase.database().ref('/calories');
var currentDateStr = moment().tz('America/New_York').format('YYYY-MM-DD');

function currentDateFirebaseRef() {
  return firebaseCalRef.child(currentDateStr);
}

function currentDateFirebaseCalories(cb) {
  return firebaseCalRef.orderByKey()
    .limitToLast(1)
    .on('value', cb);

}

module.exports = currentDateFirebaseCalories;

