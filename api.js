// var scoreSrc = "file:///Users/geralleestes/Desktop/galvanize/unit-1/q1-project/scoreboard.html?a=23"
var scoreSrc = window.location.href
var regex = /=(.+)/;
var matches = regex.exec(scoreSrc);
console.log(matches[1])
