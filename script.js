var checkbox = document.querySelector("input[name=checkbox]");

checkbox.addEventListener('change', e => {

  if(e.target.checked){
      //do something
      gameThree();
  }
  else {
    gameCont();
  }

});

const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊🏻',
    beats1: 'scissors',
    beats2: 'lizard'
  },
  {
    name: 'paper',
    emoji: '✋🏻',
    beats1: 'rock',
    beats2: 'spock'
  },
  {
    name: 'scissors',
    emoji: '✌🏻',
    beats1: 'paper',
    beats2: 'lizard'
  },
  {
    name: 'lizard',
    emoji: '🦎',
    beats1: 'paper',
    beats2: 'spock'
  },
  {
    name: 'spock',
    emoji: '🖖🏻',
    beats1: 'scissors',
    beats2: 'rock'
    
  }
]
let isChangingMode = false;

function gameCont(){
  yourScoreSpan.innerText = '0';
  computerScoreSpan.innerText = '0';
  isChangingMode = true;
  selectionButtons.forEach(selectionButton => {
    selectionButton.removeEventListener('click', makeSelection);
    selectionButton.addEventListener('click', e => {
      if (!isChangingMode) {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
      }
    })
  })
  isChangingMode = false;

checkbox.addEventListener('change', e => {

  if(e.target.checked){
      //do something
      return gameThree();
  }
  else {
    return gameCont();
  }

});
}

function gameThree(){
  yourScoreSpan.innerText = '0';
  computerScoreSpan.innerText = '0';
  isChangingMode = true;
  selectionButtons.forEach(selectionButton => {
    selectionButton.removeEventListener('click', makeSelection);
    selectionButton.addEventListener('click', e => {
      if (!isChangingMode) {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
      }
    })
  })
  isChangingMode = false;
  while ((yourScoreSpan < 3)&&(computerScoreSpan < 3)){
    yourScoreSpan.innerText = '0';
    computerScoreSpan.innerText = '0';
  }

  if (yourScoreSpan == '2'){
    alert('You win the game');
    return;
  }
  else if (computerScoreSpan == '2'){
    alert('You lose the game');
   return;
  }
 
}


function makeSelection(selection) {
  const computerSelection = randomSelection()
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  addSelectionResult(computerSelection, computerWinner)
  addSelectionResult(selection, yourWinner)

  if (yourWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan)
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.emoji
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
  return (selection.beats1 === opponentSelection.name) || (selection.beats2 === opponentSelection.name)
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
}

window.onload = function() {
  gameCont();
}

