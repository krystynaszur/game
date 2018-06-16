var gameSettings = {
  playerWins: 0,
  computerWins: 0,
  maxRounds: 0,
  playedRounds: 0,
  endOfGame: undefined,
  progress: [],
  enteredUsername: undefined
};

var random = function(items) {
  return items[Math.floor(Math.random()*items.length)];  
}

var items = [1,2,3];

var showModal = function(typeOfModal){
  event.preventDefault();

  document.getElementById('modal-overlay').classList.add('show');

  if (typeOfModal == "gameSettings") {
    document.getElementById('enter-settings').classList.add('show');
    document.getElementById('game-end').classList.remove('show');
  }
  else if (typeOfModal == "gameEnd") {
    document.getElementById('enter-settings').classList.remove('show');
    document.getElementById('game-end').classList.add('show');
  }
}

var hideModal = function(event){
  event.preventDefault();

  var visibleModals = document.querySelectorAll(".show");
  for(var i = 0; i < visibleModals.length; i++){
    visibleModals[i].classList.remove('show');
  };
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

var enterGameSettings = function(event){
  var typeOfModal = "gameSettings";
  showModal(typeOfModal);
   
  gameSettings.enteredUsername ="";
  gameSettings.maxRounds=0;
  gameSettings.playerWins =0;
  gameSettings.computerWins=0;
  gameSettings.playedRounds=0;
  
  var enterUsername = document.getElementById('username')
  enterUsername.value = "";
  var enterWins = document.getElementById('wins')
  enterWins.value = "";

};

var activateGame = function() {

  gameSettings.enteredUsername = document.getElementById('username').value;
  gameSettings.maxRounds = document.getElementById('wins').value;

  if (gameSettings.maxRounds >0) {
      document.getElementById("paper").removeAttribute("disabled");
      document.getElementById("scissors").removeAttribute("disabled");
      document.getElementById("rock").removeAttribute("disabled");
      document.querySelector('#modal-overlay').classList.remove('show');
  }
}
 
var submit = document.getElementById("submit-button");
submit.addEventListener('click', activateGame);

var newGame = document.getElementById('new-game');
newGame.addEventListener('click', enterGameSettings);

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
    } 
  else if (move == 'scissors') {
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
  } 
  else if (move == 'rock') {
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

var showRoundResult = function(roundResult, move, computer) {
  var output = document.getElementById("output");
  output.innerHTML = roundResult.text + ' You chose ' + move + ' while the computer chose '+ computer + '.';
}

var showRoundPoints = function(roundResult) {
  var result = document.getElementById('round-result');
  
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

var showTotalResult = function(roundResult) {
  
  if (roundResult.winner == 'player') {
    gameSettings.playerWins++;
  }
  else if (roundResult.winner == 'computer') {
    gameSettings.computerWins++;
  }

  gameSettings.playedRounds++;
  
  if (gameSettings.playerWins == gameSettings.maxRounds) {
    gameSettings.endOfGame = gameSettings.enteredUsername + ' won the entire game'
  }
  else if (gameSettings.computerWins == gameSettings.maxRounds) {
    gameSettings.endOfGame = 'The computer won the entire game'
  }
  else {
    gameSettings.endOfGame = 'Keep playing!'
  }
  
  var total = document.getElementById('total-result');
  total.innerHTML = "Total result is: " + 
    gameSettings.playerWins + 
    "-" + 
    gameSettings.computerWins + 
    '.<br>The number of played rounds is: ' + 
    gameSettings.playedRounds+
    '.<br>The number of points needed for victory is: ' + 
    gameSettings.maxRounds+
    '.<br>' +
    gameSettings.endOfGame;
 }

var paperButton = document.getElementById('paper');
var scissorsButton = document.getElementById('scissors');
var rockButton = document.getElementById('rock');

var buttons = document.querySelectorAll('.player-move');
	
for(var i = 0; i < buttons.length; i++) {
  var chosenButton = buttons[i].getAttribute('data-move');
  buttons[i].addEventListener('click', function() {
    startRound(chosenButton);
  });
};

var startRound = function(move) {

  if (gameSettings.maxRounds >0) { //dodajesz ten warunek,żeby gra nie była możliwa bez podania liczby rund
    
    var computer = computerMove();
    var roundResult = playerMove(move, computer);
    showRoundResult(roundResult, move, computer);
    showRoundPoints(roundResult);
    showTotalResult(roundResult);
    deactivateGame();
  }

  var roundResultsForTable = { //tworzysz obiekt do tabeli
    roundNumber: gameSettings.playedRounds,
    playerMove: move,
    computerMove: computer,
    roundResult: roundResult.winner,
    currentResult:  gameSettings.playerWins + "-" + gameSettings.computerWins 
  }

  gameSettings.progress.push(roundResultsForTable); //przesuwasz obiekt do tabeli

  for(var i = 0; i < gameSettings.progress.length; i++) {
    var gameResultsTableRows ='';
    gameResultsTableRows += '<tr><td>' + 
      gameSettings.progress[i].roundNumber  + 
      '</td><td>' + 
      gameSettings.progress[i].playerMove  + 
      '</td><td>' +
      gameSettings.progress[i].computerMove +
      '</td><td>' +
      gameSettings.progress[i].roundResult +
      '</td><td>' +
      gameSettings.progress[i].currentResult +
      '</td></tr>';
  }

  var gameResultsRows = document.getElementById('game-results-table');
  gameResultsRows.innerHTML += gameResultsTableRows
}  

var gameEnd = function(event){
  var typeOfModal = "gameEnd";
  showModal(typeOfModal);
  
  var showGameResults = document.getElementById('game-results');
  showGameResults.innerHTML ="Game over, please press the NEW GAME button!<br><br> Total result is: " + 
  gameSettings.playerWins + 
  "-" + 
  gameSettings.computerWins + 
  "<br><br> " + 
  gameSettings.endOfGame + 
  "<br><br>Here is the game progress: <br><br> ";

  var output = document.getElementById('output');
  output.innerHTML=" ";
  var result = document.getElementById('round-result');
  result.innerHTML=" ";
  var total = document.getElementById('total-result');
  total.innerHTML=" ";
};

var deactivateGame = function () {
  if (gameSettings.playerWins == gameSettings.maxRounds ||gameSettings.computerWins == gameSettings.maxRounds) {  
    gameEnd(event);
    document.getElementById("paper").setAttribute("disabled", "disabled");
    document.getElementById("scissors").setAttribute("disabled", "disabled");
    document.getElementById("rock").setAttribute("disabled", "disabled");
  }
}









