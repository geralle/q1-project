var position = 0;
var moveOver = 30;
var bombId = 0;
var ptsDisplayed = [];
var gameOn = true;
var gameTime = 1000;

startButton = document.getElementById('play-button')
startButton.addEventListener('click',function(event){
  event.preventDefault()
  var userScore = 0
  // bombDrop();
  if(gameOn===true){
    setInterval(function(){
      userScore++;
      $('#result').text(userScore)
      bombDrop();
    },gameTime)
  }
})

playerContainer = document.getElementById('player-container')
window.addEventListener("keydown",function(event){
  if(event.keyCode===37 && position > 0){
    position = position-moveOver;
    var usrMove = document.getElementById("usr");
    usrMove.setAttribute('style','margin-left:'+ position + "px")
  }else if(event.keyCode===39){
    width = playerContainer.offsetWidth - 100
    if(position<width){
      position = position+moveOver;
      var usrMove = document.getElementById("usr");
      usrMove.setAttribute('style','margin-left:'+ position + "px")
    }
  }
});

function bombDrop(){
  bombId++;
  var randomColumn = Math.floor(Math.random() * 12)+1;
  var column = document.getElementById("column-"+randomColumn);
  var bombIcon = document.createElement('div');
  bombIcon.setAttribute('id','bomb-' + bombId)
  bombIcon.setAttribute('class','bombs')
  bombIcon.setAttribute('style',
      `animation: bomb-drop 5s;
      position: absolute;
      font-size: 30px;
      margin: 0;
      padding: 0;`)
  bombIcon.innerText = "💣";
  column.append(bombIcon);
  var bombIcon = document.getElementsByClassName("bombs")
  ptsDisplayed.push(bombIcon)
  var timeout = setTimeout(function(){
    // ptsDisplayed.shift()
    var explodeColumn = $(column)[0].id
    var explodePosition = $(column).offset().left
    var user = document.getElementById("usr")
    var userPosition = $(user).offset().left
    // console.log(explodePosition)
    // console.log(userPosition)
    var blastDiff = explodePosition-userPosition
    var inverseBlastDiff = 0;
    if(Math.sign(blastDiff) === -1){
      inverseBlastDiff = blastDiff * -1;
    }
    if(blastDiff>=60 || inverseBlastDiff>=60){
      console.log("safe")
    }else{
      console.log("dead")
    }
  },5000);
}

function collision(explodeColumn){
  console.log(explodeColumn)
}
