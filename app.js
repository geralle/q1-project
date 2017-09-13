var position = 0;
var moveOver = 40;
var bombsDisplayed = [];
var gameOn = true;
var gameTime = 175;
var blastZone = 50;

var userScore = 0;
startButton = document.getElementById('play-button')
startButton.addEventListener('click',function(event){
  event.preventDefault()
  console.log("clicked")
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
    top:gameboardHeight-40
  },2300, function() {
    // Animation complete.
    var explodeColumn = $(column)
    var bombBlast = document.getElementById(bombId)
    bombBlast.innerText = "💥"
    console.log(collision(column));
    setTimeout(function(){
      bombBlast.innerText = ""
    },200)
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
