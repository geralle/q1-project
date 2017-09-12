var position = 0;
var moveOver = 30;
var bombsDisplayed = [];
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
  var randomColumn = Math.floor(Math.random() * 12)+1;
  var column = document.getElementById("column-"+randomColumn);
  var bombIcon = document.createElement('div');
  bombsDisplayed.push(bombIcon)
  var bombId = bombsDisplayed.length;
  bombIcon.setAttribute('class','bombs')
  bombIcon.setAttribute('style',
      `animation: bomb-drop 5s;
      position: absolute;
      font-size: 30px;
      margin: 0;
      padding: 0;`)
  bombIcon.innerText = "💣";
  bombIcon.setAttribute('id','bomb-' + bombId);
  column.append(bombIcon);
  var bombIcon = document.getElementsByClassName("bombs")
  setTimeout(function(){
    var explodeColumn = $(column)
    var explodeId = "bomb-"+bombId
    var bombBlast = document.getElementById(explodeId)
    console.log(bombBlast)
    collision(column);
    // bombBlast.innerText = "💥"
    // setTimeout(function(){
    //   bombsDisplayed.shift()
    //   bombBlast.parentNode.removeChild(bombBlast)
    // },200)
  },5000);
}

function collision(column){
  var explodePosition = $(column).offset().left
  var user = document.getElementById("usr")
  var userPosition = $(user).offset().left
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
}
