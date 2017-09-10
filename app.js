startButton = document.getElementById('play-button')
playerContainer = document.getElementById('player-container')
console.log(playerContainer.offsetWidth)

// start button
startButton.addEventListener('click',function(event){
  event.preventDefault()
  dropPoint();
})
var position = 0;

window.addEventListener("keydown",function(event){
  if(event.keyCode===37 && position > 0){
    position = position-50
    console.log(position)
    var pointGrabber = document.getElementById("point-grabber");
    pointGrabber.setAttribute('style','margin-left:'+ position + "px")
  }else if(event.keyCode===39){
    width = playerContainer.offsetWidth - 50
    // console.log(width)
    if(position<width){
      position = position+50
      console.log(position)
      var pointGrabber = document.getElementById("point-grabber");
      pointGrabber.setAttribute('style','margin-left:'+ position + "px")
    }
  }
});

function dropPoint(){
  var randomColumn = Math.floor(Math.random() * 12);
  var column = document.getElementById("column-"+randomColumn);
  var pointIcon = document.createElement('div');
  pointIcon.setAttribute('id','point-icon')
  pointIcon.setAttribute('style',
      `animation: point-drop 5s;
      position: absolute;
      background-color: blue;
      height: 20px;
      width: 20px;`)
  column.append(pointIcon);
  var timeout = setTimeout(function(){
    console.log(column)
    column.innerText = ""
  },5000);
}
