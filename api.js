var scoreSrc = window.location.href
var regex = /=(.+)/;
var userScore = regex.exec(scoreSrc);
$('#result').text(userScore[1])
var apiUrl = `https://galvanize-leader-board.herokuapp.com/api/v1/leader-board`
var game = "TRVA";
var scoresArr = [];

var restartButton = document.getElementById('replay-button')
restartButton.addEventListener('click',function(event){
  event.preventDefault()
  window.open('index.html',"_self")
})

function sortScores(a,b) {
  return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);
}

function getHighScores(){
  return fetch(apiUrl).then(function(response){
    return response.json().then(function(highScores){
      var sortedLeaderboard = highScores.sort(sortScores);
      for(var i=0;i<sortedLeaderboard.length;i++){
        if(sortedLeaderboard[i].game_name===game){
          var gameNameScores = highScores[i]
          scoresArr.push(gameNameScores)
        }
      }
      return scoresArr
    })
  })
}

function showLeaderboard(){
  return getHighScores().then(function(scoresArr){
    for(var i=0;i<5;i++){
      var topScores = scoresArr[i]
      var ranking = i+1
      var leaderboardNames = topScores.player_name
      var leaderboardScores = topScores.score

      var highScoresContainer = document.getElementById('high-scores')

      var scoreRow = document.createElement('div')
      scoreRow.setAttribute('class','row')
      scoreRow.setAttribute('id','score-row')
      highScoresContainer.append(scoreRow)

      var rankDiv = document.createElement('div')
      rankDiv.setAttribute('class','column col-1')
      rankDiv.setAttribute('id','players-ranking')
      rankDiv.innerText = ranking
      scoreRow.append(rankDiv)

      var nameDiv = document.createElement('div')
      nameDiv.setAttribute('class','column col-4')
      nameDiv.setAttribute('id','players-name')
      nameDiv.innerText = leaderboardNames
      scoreRow.append(nameDiv)

      var scoreDiv = document.createElement('div')
      scoreDiv.setAttribute('class','column col-2')
      scoreDiv.setAttribute('id','players-score')
      scoreDiv.innerText = leaderboardScores
      scoreRow.append(scoreDiv)
    }
    return leaderboardScores
  })
}

function checkScores(userScore){
  var scoreboard = 0
  return getHighScores().then(function(leaderboard){
    for(var i=0;i<5;i++){
      // console.log(foo[0].score)
      if(userScore>leaderboard[i].score){
        scoreboard++
      }
    }
    if(scoreboard != 0){
      console.log(scoreboard)
    }else{
      console.log("Play Again")
    }
  })
}

function postScore(){

}

showLeaderboard()
checkScores(100)
