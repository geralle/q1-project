var position = 0;
var moveOver = 40;
var bombsDisplayed = [];
var gameOn = false;
var blastZone = 63;
var userScore = 0;
var gameTime = 155;

startButton = document.getElementById('play-button')
startButton.addEventListener('click',function(event){
  event.preventDefault()
  gameOn = true;
  // animation();
  if(gameOn===true){
    gameOn=false;
    gameInterval = setInterval(function(){
      userScore++;
      $('#result').text(userScore)
      animation();
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

function animation(){
  var randomColumn = Math.floor(Math.random() * 12)+1;
  var column = document.getElementById("column-"+randomColumn);
  var bombIcon = document.createElement('div');
  bombsDisplayed.push(bombIcon)
  var bombNum = bombsDisplayed.length;
  bombIcon.setAttribute('class','bombs')
  bombIcon.setAttribute('style',
      `position: absolute;
      font-size: 30px;
      margin: 0;
      padding: 0;`)
  bombIcon.innerText = "💣";
  var bombId = 'bomb-' + bombNum
  bombIcon.setAttribute('id', bombId);
  column.append(bombIcon);
  var explodeId = document.getElementById(bombId)
  var gameboardHeight = $(document.getElementById("gameboard-columns")).height()
  $(explodeId).animate({
    top:gameboardHeight-53
  },2100, function() {
    var explodeColumn = $(column)
    var bombBlast = document.getElementById(bombId)
    bombBlast.innerText = "💥"
    collision(column)
    setTimeout(function(){
      bombBlast.innerText = ""
    },78)
  });
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
  // needs to be changed for mobile
  if(blastDiff>=blastZone || inverseBlastDiff>=blastZone){
    return "safe"
  }else{
    gameOver()
  }
}

function gameOver(){
  clearInterval(gameInterval)
  window.open('scoreboard.html?a='+userScore,"_self")
}

var bombs = document.getElementsByClassName("bombs")
window.setInterval(function() {
  if($(window).width()<=770 && gameOn===true){
    var blastZone = 0;
  }
}, 100);

console.log("App by Geralle Estes")
