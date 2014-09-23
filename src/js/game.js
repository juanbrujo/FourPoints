var player = document.querySelector('#player'),
    start = document.querySelector('#start'),
    totalHeight = player.offsetTop,
    plays = 5, 
    speed = 6,
    subsSpeed = 0,
    id = 0, 
    score = document.querySelector('#score'),
    colors= ["blue","orange","green","red"],
    indexColor = 1;
 
// ===
// === PLAYER
// ===

// ROTATE THE PLAYER CLOCKWISE
function play() { 
  player.className = colors[0];
  player.addEventListener('click',function(e){
    var deg = 90;
    player.style.webkitTransform += 'rotate('+deg+'deg)';
    player.style.transform += 'rotate('+deg+'deg)';
    nextColor();
  });
  makeBox(subsSpeed);
  score.innerHTML = plays;
}

// ITERATE COLORS FROM ARRAY
function nextColor() {
   player.className = colors[indexColor];
   indexColor = (indexColor+1)%(colors.length);
};

// ===
// === BOX
// ===

// CREATE NEW BOX
function makeBox(subsSpeed) {
  var random = colors[Math.floor(Math.random() * colors.length)],
      box = document.querySelector('span');
  
  function newBox(){
    var box = document.createElement('span');
    box.className = random
    document.body.appendChild(box);
    move(box,totalHeight,subsSpeed);
  }
  
  if (box) {
    document.body.removeChild(box);
    newBox();
  } else {
    newBox();
  }
  
}

// ANIMATE THE BOX
function move(elem,height,subsSpeed) {
  var top = 0;
  function frame() {
    top++;
    elem.style.top = top + 'px';
    if (top == height){
      clearInterval(id);
      win(player,elem);
    }
  }

  id = setInterval(frame, (speed - subsSpeed)); // less faster
}
function clearPlay(){
  document.body.removeChild(box);
  clearInterval(id);
}
// ===
// === WIN/LOOSE
// ===

// WIN
function win(player,box){
  var playerColor = player.className,
      boxColor = box.className;
  var currentScore = score.innerHTML;
  if(playerColor === boxColor) {
    
    score.innerHTML = parseInt(currentScore) -  1;
    
    if(score.innerHTML == 0){
      // end
      modal("end","WINNER");
      clearPlay();
    } else {
      newSpeed = ( ( ( plays - score.innerHTML ) + 1 ) );
    }
    // winner
    makeBox(newSpeed);
    score.classList.remove('bad');
    score.className += " good";
  } else {
    // loser
    makeBox(0);
    score.classList.remove('good');
    score.className += " bad";
  }
  
}

// MODAL CONTROL
function modal(showhide,message){
  var modal = document.querySelector('#modal'),
      title = document.querySelector('#title'),
      msg = document.querySelector('#msg');
  
  if ( showhide === "show" ) {
    translate = "0%";
  } else if ( showhide === "hide" ) {
    translate = "-1000%";
  } else if ( showhide === "end" ) {
    translate = "0%";
    start.style.opacity = "0";
  }
  msg.innerHTML = message;
  modal.style.webkitTransform = 'translateX('+translate+')';
  modal.style.transform = 'translateX('+translate+')';
  title.style.webkitTransform = 'translateX('+translate+')';
  title.style.transform = 'translateX('+translate+')';
  msg.style.webkitTransform = 'translateX('+translate+')';
  msg.style.transform = 'translateX('+translate+')';
  start.style.webkitTransform = 'translateX('+translate+')'; 
  start.style.transform = 'translateX('+translate+')'; 
}

// ===
// === INIT
// ===
function init(){
  modal("show","click the wheel to make it match the color of the box");
  start.addEventListener('click',function(e){
    modal("hide","");
    play();
  });
}

init();

