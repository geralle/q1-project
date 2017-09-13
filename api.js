var scoreSrc = window.location.href
var regex = /=(.+)/;
var userScore = regex.exec(scoreSrc);
$('#result').text(userScore[1])
url = `https://galvanize-leader-board.herokuapp.com/api/v1/leader-board`
var game = "Deadpool"

var restartButton = document.getElementById('replay-button')
restartButton.addEventListener('click',function(event){
  event.preventDefault()
  window.open('index.html',"_self")
})

function sortScores(a,b) {
  return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);
}

function getHighScores(){
  fetch(url).then(function(response){
    return response.json().then(function(highScores){
      var sortedLeaderboard = highScores.sort(sortScores);
      for(var i=0;i<sortedLeaderboard.length;i++){
        if(sortedLeaderboard[i].game_name===game){
          var gameNameScores = highScores[i]
          var leaderboardNames = gameNameScores.player_name
          var leaderboardScores = gameNameScores.score
          var highScoresContainer = document.getElementById('high-scores')
          var playerScoreContainer = document.createElement('div')
          playerScoreContainer.setAttribute('id','player-score-container')
          var nameDiv = document.createElement('div')
          var scoreDiv = document.createElement('div')
          nameDiv.setAttribute('class','players-names')
          scoreDiv.setAttribute('class','player-scores')
          nameDiv.innerText = leaderboardNames
          scoreDiv.innerText = leaderboardScores
          highScoresContainer.append(playerScoreContainer)
          playerScoreContainer.append(nameDiv)
          playerScoreContainer.append(scoreDiv)
        }
      }
    })
  })
}

function checkName(playersName){
  var names = []
  fetch(url).then(function(response){
    return response.json().then(function(highScores){
      var sortedLeaderboard = highScores.sort(sortScores);
      for(var i=0;i<sortedLeaderboard.length;i++){
        if(sortedLeaderboard[i].game_name===game){
          var gameScores = highScores[i]
          var leaderboardNames = gameScores.player_name
          for(var j=0;j<leaderboardNames.length;j++){
            names.push(leaderboardNames)
          }
        }
      }
      for(var x=0;x<names.length;x++){
        if(playersName === names[x]){
          return true
        }
      }
    })
  })
}

function postScore(){

}

// checkName('Will')
getHighScores()
