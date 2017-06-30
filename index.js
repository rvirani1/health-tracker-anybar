const anybar = require('anybar');
const currentDateFirebaseCalories = require('./firebase_connection');
const execSync = require('child_process').execSync;

currentDateFirebaseCalories(function(data) {
  var parsed = data.val();
  var date = Object.keys(parsed)[0];
  var calories = parsed[date];
  console.log(calories);


  if (calories < 1500) {
    anybar('green');
  } else if (calories < 2000) {
    anybar('yellow');
    execSync('say "Alert! Getting close to your caloric limit!"');
  } else {
    anybar('red');
    execSync('say "Dude, stop eating!"');
  }
});

