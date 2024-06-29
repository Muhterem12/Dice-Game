'use strict';

const scores1 = document.querySelectorAll('.score');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Add dice to current score
    if (dice !== 1) {
      // currentScore = currentScore + dice
      currentScore += dice;

      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  console.log(scores);
  if (playing) {
    console.log(scores[activePlayer]);

    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
    // Switch to next player
  }
});
// challenge

btnNew.addEventListener('click', function () {
  playing = true;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--winner');
  currentScore = 0;
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document.querySelector(`#score--${i}`).textContent = 0;
  }
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
});
