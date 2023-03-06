window.addEventListener('load', function() {
  document.querySelector('input[name="game-mode"]').checked = false;
});

const SELECTIONS = [  { name: 'rock', emoji: '✊🏻', beats: ['scissors', 'lizard'] },
  { name: 'paper', emoji: '✋🏻', beats: ['rock', 'spock'] },
  { name: 'scissors', emoji: '✌🏻', beats: ['paper', 'lizard'] },
  { name: 'lizard', emoji: '🦎', beats: ['paper', 'spock'] },
  { name: 'spock', emoji: '🖖🏻', beats: ['scissors', 'rock'] }
];

const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
let gameMode = 'continuous';

function resetScore() {
  yourScoreSpan.textContent = 0;
  computerScoreSpan.textContent = 0;
}

function resetResults() {
  const results = document.querySelectorAll('.result-selection');
  results.forEach(result => result.remove());
}

function makeSelection(selection) {
  const computerSelection = SELECTIONS[Math.floor(Math.random() * SELECTIONS.length)];
  const yourWinner = selection.beats.includes(computerSelection.name);
  const computerWinner = computerSelection.beats.includes(selection.name);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) incrementScore(yourScoreSpan);
  if (computerWinner) incrementScore(computerScoreSpan);

  if (gameMode === 'best-out-of-three') {
    if (yourScoreSpan.textContent == 2) {
      alert('You win the game!');
      resetScore();
      resetResults();
      return;
    } else if (computerScoreSpan.textContent == 2) {
      alert('You lose the game!');
      resetScore();
      resetResults();
      return;
    }
  }
}

function incrementScore(scoreSpan) {
  scoreSpan.textContent++;
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div');
  div.textContent = selection.emoji;
  div.classList.add('result-selection');
  if (winner) div.classList.add('winner');
  finalColumn.after(div);
}

function handleSelection(e) {
  if (gameMode === 'continuous' || (gameMode === 'best-out-of-three' && (yourScoreSpan.textContent < 2 && computerScoreSpan.textContent < 2))) {
    makeSelection(SELECTIONS.find(selection => selection.name === e.target.dataset.selection));
  }
}

function handleCheckbox(e) {
  gameMode = e.target.checked ? 'best-out-of-three' : 'continuous';
  resetScore();
  resetResults();
}

selectionButtons.forEach(button => {
  button.addEventListener('click', handleSelection);
});

document.querySelector('input[name="game-mode"]').addEventListener('change', handleCheckbox);
