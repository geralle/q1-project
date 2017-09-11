var position = 0;
var moveOver = 30;

// start button
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
    width = playerContainer.offsetWidth - 50
    if(position<width){
      position = position+moveOver;
      var pointGrabber = document.getElementById("point-grabber");
      pointGrabber.setAttribute('style','margin-left:'+ position + "px")
    }
  }
});

function dropPoint(){
  var randomColumn = Math.floor(Math.random() * 12)+1;
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
    column.innerText = ""
  },5000);
}

// function collision($div1, $div2) {
//       var x1 = $div1.offset().left;
//       var y1 = $div1.offset().top;
//       var h1 = $div1.outerHeight(true);
//       var w1 = $div1.outerWidth(true);
//       var b1 = y1 + h1;
//       var r1 = x1 + w1;
//       var x2 = $div2.offset().left;
//       var y2 = $div2.offset().top;
//       var h2 = $div2.outerHeight(true);
//       var w2 = $div2.outerWidth(true);
//       var b2 = y2 + h2;
//       var r2 = x2 + w2;
//
//       if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
//       	return false;
//       }else{
//       	return true;
//       }
// }
//
//
// window.setInterval(function() {
//     $('#result').text(collision($('#div1'), $('#div2')));
// }, 200);
