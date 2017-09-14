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
      `animation: point-drop 6s;
      position: absolute;
      background-color: blue;
      height: 20px;
      width: 20px;
      margin: 0;
      padding: 0;`)
  column.append(pointIcon);
  var pointIcon = document.getElementsByClassName("points")
  ptsDisplayed.push(pointIcon)

  var timeout = setTimeout(function(){
    column.innerText = ""
    ptsDisplayed.shift()
  },6000);
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
    return false
  }else{
    return true
  }
}

// Using $points
// For: If $points[i] collision player container return true
//    If $points[i] collision with paddle
//         Remove from page
//          Add score
//     Else game over

// function gameStatus(playerStatus){
//   console.log(playerStatus)
//   for(var j=0;j<playerStatus.length;j++){
//     if(playerStatus[j]===1){
//       userScore++
//       console.log(userScore);
//     }else if (playerStatus[j]===0) {
//       console.log("gameover..")
//     }
//   }
// }

window.setInterval(function() {
  if(ptsDisplayed.length!=0){
    // $('#result').text(collision($('.points'), $('#point-grabber')));
    var pointsCounter = $('.points')
    for(var i=0;i<pointsCounter.length;i++){
      var playerStatus = []
      var grabberDetect = collision(pointsCounter, $('#point-grabber'));
      if(grabberDetect===true){
        pointsCounter[i].id.setAttribute('style','')
        console.log("score");
        // var scorePointId = document.getElementById("pointsCounter[i].id")
        // console.log(scorePointId)
      }
      else{
        var containerDetect = collision(pointsCounter, $('#player-container'));
        if(containerDetect===true){
          console.log("gameover")
        }
      }
    }
  }
}, 100);
