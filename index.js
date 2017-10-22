"use strict";

const anybar = require('anybar');
const currentDateFirebaseCalories = require('./firebase_connection');
const execSync = require('child_process').execSync;

const parseCalsFromData = (data) => {
  const parsed = data.val();
  const date = Object.keys(parsed)[0];
  return parsed[date];
};

const determineColor = (calories) => {
  if (calories < 1500) {
    return 'green';
  } else if (calories < 2000) {
    execSync('say "Alert! Getting close to your caloric limit!"'); // Let's have some fun!
    return 'yellow';
  } else {
    execSync('say "Dude, stop eating!"'); // More fun!
    return 'red';
  }
};

currentDateFirebaseCalories((data) => {
  const calories = parseCalsFromData(data);
  const color = determineColor(calories);
  anybar(color)
});

