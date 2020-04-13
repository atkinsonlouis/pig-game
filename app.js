/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//defining variables // 
var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
var roll = document.querySelector('.btn-roll');
var winningScore = 100;
var gamePlaying = true;


var Score0 = document.getElementById('score-0').textContent = '0';
var Score1 = document.getElementById('score-1').textContent = '0';
var current0 = document.getElementById('current-0').textContent = '0';
var current1 = document.getElementById('current-1').textContent = '0';

//end of defining variables // 

document.querySelector('.dice').style.display = 'none';



// events //

// Event 1, roll dice and update the current score //
roll.addEventListener('click', function () {
  var dice = Math.floor(Math.random() * 6) + 1;
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';
  if (dice !== 1) { // add the number of the dice to the current round score unless number = 1;
    roundScore += dice;
    // ^ done to add value of the rolled dice to the value of the round score.
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    // ^ updates the text value of the current players round score to the round score declared in here which is the same as the dice.
    // it is current- and active player because this will later be programmed to change.
  }
  else {
    nextPlayer();
  }
});
//end of Event 1 --

//-- Event 2, implementing the hold feature --// 

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

// events //


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}