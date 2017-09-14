var scoreSrc = window.location.href
var regex = /=(.+)/;
var userScoreArr = regex.exec(scoreSrc);
if(userScoreArr===null){
  userScore = 0
}else{
  var userScore = userScoreArr[1]
}
$('#result').text(userScore)
var apiUrl = `https://galvanize-leader-board.herokuapp.com/api/v1/leader-board`
var game = "underAttack";
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
      scoreRow.setAttribute('class','score-row')
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
      scoreDiv.setAttribute('class','column col-1')
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
      openScoreForm()
    }
  })
}

function openScoreForm(){
  var leaderboard = document.getElementById('leaderboard')
  var newScoreDiv = document.createElement('div')
  newScoreDiv.setAttribute('id','new-high-score')
  leaderboard.append(newScoreDiv)

  var highScoreHeader = document.createElement('h3')
  highScoreHeader.setAttribute('id','high-score-header')
  highScoreHeader.innerText = "New High Score!"
  newScoreDiv.append(highScoreHeader)

  var highScoreForm = document.createElement('form')
  highScoreForm.setAttribute('id','high-score-form')
  newScoreDiv.append(highScoreForm)

  var userNameInput = document.createElement('div')
  userNameInput.setAttribute('id','user-name-input')
  highScoreForm.append(userNameInput)

  var userInput = document.createElement('input')
  userInput.setAttribute('type','text')
  userInput.setAttribute('placeholder','Enter your name')
  userInput.setAttribute('name','user-name')
  userNameInput.append(userInput)

  var userFormScore = document.createElement('div')
  userFormScore.setAttribute('id','user-score')
  userFormScore.innerText = userScore
  highScoreForm.append(userFormScore)

  var formButton = document.createElement('button')
  formButton.setAttribute('id','submit-button')
  formButton.innerText = "Submit"
  highScoreForm.append(formButton)

  var form = document.getElementById('high-score-form')
  var formSubmit = document.getElementById("submit-button")
  form.addEventListener('submit',function(event){
    event.preventDefault()
    playersInputName = event.target.elements["user-name"].value
    postHighScore(playersInputName)
    $(form).hide()
    highScoreHeader.innerText = "Congrats " + playersInputName + "!"
    setTimeout(function(){
      window.open('scoreboard.html',"_self")
    },900)
  })
}

function postHighScore(playersInputName){
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      game_name: "underAttack",
      player_name: playersInputName,
      score: userScore
    })
  }).then(function(response){
    console.log('Request succeeded with JSON response', response);
  }).catch(function(error){
    console.log('Request failed', error);
  });
}

showLeaderboard()
checkScores(userScore)
