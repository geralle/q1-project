var position = 0;
var moveOver = 30;
var userScore = 0;
var pointId = 0
var ptsDisplayed = []

startButton = document.getElementById('play-button')
startButton.addEventListener('click',function(event){
  event.preventDefault()
  dropPoint();
})

playerContainer = document.getElementById('player-container')
window.addEventListener("keydown",function(event){
  if(event.keyCode===37 && position > 0){
    position = position-moveOver;
    var pointGrabber = document.getElementById("point-grabber");
    pointGrabber.setAttribute('style','margin-left:'+ position + "px")
  }else if(event.keyCode===39){
    width = playerContainer.offsetWidth - 60
    if(position<width){
      position = position+moveOver;
      var pointGrabber = document.getElementById("point-grabber");
      pointGrabber.setAttribute('style','margin-left:'+ position + "px")
    }
  }
});

function dropPoint(){
  pointId++;
  var randomColumn = Math.floor(Math.random() * 12)+1;
  var column = document.getElementById("column-"+randomColumn);
  var pointIcon = document.createElement('div');
  pointIcon.setAttribute('id','point-' + pointId)
  pointIcon.setAttribute('class','points')
  pointIcon.setAttribute('style',
      `border:4px solid purple;
      animation: point-drop 5s;
      position: absolute;
      background-color: blue;
      height: 20px;
      width: 20px;`)
  column.append(pointIcon);
  var pointIcon = document.getElementsByClassName("points")
  ptsDisplayed.push(pointIcon)
  // getPointsDisplay(ptsDisplayed)
  var timeout = setTimeout(function(){
    column.innerText = ""
    ptsDisplayed.shift()
  },5000);
}

var pts = function getPointsDisplay(pts){
  return pts
}

function collision($points, $detector) {
  var x1 = $points.offset().left;
  var y1 = $points.offset().top;
  var h1 = $points.outerHeight(true);
  var w1 = $points.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $detector.offset().left;
  var y2 = $detector.offset().top;
  var h2 = $detector.outerHeight(true);
  var w2 = $detector.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
  	return userScore;
  }else{
    // console.log($points)
    userScore++
  	return userScore;
  }
}

function gameOver(){
  // each point inside of ptsDisplayed
  // console.log(pts)
  // for each check if theyre inside player container
  // if they are / check if theyre touching the paddle
  // if they are / add a point
  // else game over
}

window.setInterval(function() {
  if(ptsDisplayed.length!=0){
    $('#result').text(collision($('.points'), $('#point-grabber')));
  }
}, 100);
