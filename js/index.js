var gameSettings = {
playerWins: 0,
computerWins: 0,
maxRounds: 0,
playedRounds: 0,
endOfGame: undefined
};

var random = function(items)
{
return items[Math.floor(Math.random()*items.length)];  
}
var items = [1,2,3];

var computerMove = function() {
  var computerNumber = random(items); 
  
   if (computerNumber==1) {
         return 'paper';
        } 
     else if (computerNumber==2) {
         return 'rock';
        } 
     else if (computerNumber==3) {
         return 'scissors';
     }
};

var playerMove = function(move, computer) {
  
  var result = {
    text: '',
    winner: ''
  };
  
 if (move == 'paper') {
    if (computer == 'paper') {
    result.text = 'It is a draw.';
    result.winner = 'draw';
    } 
    else if (computer == 'scissors') {
    result.text = 'You lose.';
    result.winner = 'computer';
    } 
    else if (computer == 'rock') {
    result.text = 'You win.';
    result.winner = 'player';
    }
} else if (move == 'scissors') {
    if (computer == 'paper') {
    result.text = 'You win.';
    result.winner = 'player';
    } 
    else if (computer == 'scissors') {
    result.text = 'It is a draw.';
    result.winner = 'draw';
    } 
    else if (computer == 'rock') {
    result.text = 'You lose.';
    result.winner = 'computer';
    }
} else if (move == 'rock') {
    if (computer == 'paper') {
    result.text = 'You lose.';
    result.winner = 'computer';
    } 
    else if (computer == 'scissors') {
    result.text = 'You win. ';
    result.winner = 'player';
    } 
    else if (computer == 'rock') {
    result.text = 'It is a draw. ';
    result.winner = 'draw';
    }
}
return result;
};

var showResult = function(roundResult, move, computer) {
  var output = document.getElementById("output");
output.innerHTML = roundResult.text + ' You chose ' + move + ' while the computer chose '+ computer + '.';
}

var gameResult = function(roundResult) {
var result = document.getElementById('result');
  
var playerWin=0;
  var computerWin=0;
  
 if (roundResult.winner == "player") { //tworzysz tak warunek, by nie stosować tekstów z inner.HTML, tylko dane, które się nie zmieniają
   playerWin++;
    }
 else if (roundResult.winner == "computer") {
  computerWin++;
   }
    
result.innerHTML = "Round result: " + playerWin + "-" + computerWin;
}

var deactivateGame = function () {
  if (gameSettings.playerWins == gameSettings.maxRounds ||gameSettings.computerWins == gameSettings.maxRounds) {  
    showModal(event);
  var welcome = document.getElementById('welcome');
  welcome.innerHTML="Game over, please press the NEW GAME button!<br><br>";
  
  document.getElementById("paper").setAttribute("disabled", "disabled");
  document.getElementById("scissors").setAttribute("disabled", "disabled");
  document.getElementById("rock").setAttribute("disabled", "disabled");
  }
}

var startRound = function(move) {

  if (gameSettings.maxRounds >0) { //dodajesz ten warunek,żeby gra nie była możliwa bez podania liczby rund
var computer = computerMove();
var roundResult = playerMove(move, computer);
showResult(roundResult, move, computer);
gameResult (roundResult);
showTotalResult(roundResult);
deactivateGame();
  }
}

var paperButton = document.getElementById('paper');
var scissorsButton = document.getElementById('scissors');
var rockButton = document.getElementById('rock');


/*paperButton.addEventListener('click', function() {
  startRound('paper');
});

scissorsButton.addEventListener('click', function() {
    startRound('scissors');
 });

rockButton.addEventListener('click', function() { 
  startRound('rock');
});*/

var buttons = document.querySelectorAll('.player-move');
	
for(var i = 0; i < buttons.length; i++) {
    var chosenButton = buttons[i].getAttribute('data-move');
    buttons[i].addEventListener('click', function() {
      startRound(chosenButton);
    });
  };
  
var showTotalResult = function(roundResult) {
  
  //var endOfGame
  
  if (roundResult.winner == 'player') {
    gameSettings.playerWins++;
   
  }
  else if (roundResult.winner == 'computer') {
    gameSettings.computerWins++;
  }
  else if (roundResult.winner == 'draw') {
  }
  
    gameSettings.playedRounds++;
  
  if (gameSettings.playerWins == gameSettings.maxRounds) {
    gameSettings.endOfGame = 'You won the entire game'}
  else if (gameSettings.computerWins == gameSettings.maxRounds) {
    gameSettings.endOfGame = 'The computer won the entire game'}
  else {
    gameSettings.endOfGame = 'Keep playing!'}
  
var total = document.getElementById('total result');
total.innerHTML = "Total result is: " + gameSettings.playerWins + "-" + gameSettings.computerWins + '.<br>The number of played rounds is: ' + gameSettings.playedRounds+'.'
  + '<br>The number of points needed for victory is: ' + gameSettings.maxRounds+'.'+ '<br>' + gameSettings.endOfGame;
}

var newGame = document.getElementById('new-game');

newGame.addEventListener('click', function() {
	gameSettings.maxRounds = window.prompt('How many points mean victory in the entire game?');
  gameSettings.playerWins =0;
  gameSettings.computerWins=0;
  gameSettings.playedRounds=0;
  activateGame();
  
 var output = document.getElementById('output');
 output.innerHTML=" ";
  var result = document.getElementById('result');
 result.innerHTML=" ";
   var total = document.getElementById('total result');
 total.innerHTML=" "; //usuwasz wszystkie teksty, możesz to też zrobić za pomoc querySelectorAll, ale powstaje z tego tablica
  var welcome = document.getElementById('welcome');
welcome.innerHTML="Good luck!<br><br>";
});

var activateGame = function() {
  
  if (gameSettings.maxRounds >0) {
                  document.getElementById("paper").removeAttribute("disabled");
 document.getElementById("scissors").removeAttribute("disabled");
 document.getElementById("rock").removeAttribute("disabled");
  }
}

var showModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.add('show');

/*var chosenLink = this.getAttribute('href');
console.log(chosenLink);*/

document.querySelector('#game-end').classList.add('show');
var showGameResults = document.getElementById('game-results')
showGameResults.innerHTML ="Game over, please press the NEW GAME button!<br><br> Total result is: " + gameSettings.playerWins + "-" + gameSettings.computerWins + "<br><br>" + gameSettings.endOfGame;

var output = document.getElementById('output');
output.innerHTML=" ";
 var result = document.getElementById('result');
result.innerHTML=" ";
  var total = document.getElementById('total result');
total.innerHTML=" ";

}
var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}

var deactivateGame = function () {
  if (gameSettings.playerWins == gameSettings.maxRounds ||gameSettings.computerWins == gameSettings.maxRounds) {  
    showModal(event);
  var welcome = document.getElementById('welcome');
  welcome.innerHTML="Game over, please press the NEW GAME button!<br><br>";
  
  document.getElementById("paper").setAttribute("disabled", "disabled");
  document.getElementById("scissors").setAttribute("disabled", "disabled");
  document.getElementById("rock").setAttribute("disabled", "disabled");
  }
}

