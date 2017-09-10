startButton = document.getElementById('play-button')

// start button
startButton.addEventListener('click',function(event){
  event.preventDefault()
  dropPoint();

})

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
