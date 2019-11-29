const total = document.getElementById('total');
const numOfWins = document.getElementById('wins');
const gameBoard = document.getElementById('game');
const player = document.getElementById('player');
const square = document.querySelectorAll('.square');
let currentPlayer = {
  text: 'X',
  toggle: function() {
    if (this.text == 'X') this.text = 'O';
    else this.text = 'X';
    displayPlayersTurn();
  }
};
let game = {
  turn: 0,
  takeTurn: function() {
    this.turn++;
  },
  isOver: function(index) {
    return threeInARow(index) || this.isDraw();
  },
  isDraw: function() { return this.turn == 9; },
  reset: function() { this.turn = 0; setupGame(); }
};
let gamesPlayed = 0;
let wins = { X: 0, O: 0 };
const threeInARow = (index) => {
  let isWinner = false;
  if (checkRow(index)) isWinner = true;
  if (checkColumn(index)) isWinner = true;
  switch (index) {
    case 0:
    case 8:
      if (checkBackSlash(index)) isWinner = true; break;
    case 2:
    case 6:
      if (checkSlash(index)) isWinner = true; break;
    case 4: 
      if (checkSlash(index)) isWinner = true;
      if (checkBackSlash(index)) isWinner = true; break;
  }
  return isWinner;
};
const checkRow = (index) => {
  let isWinner = false;
  switch (index) {
    case 0:
    case 1:
    case 2:
      isWinner = square[0].innerText !== '' && square[0].innerText == square[1].innerText && square[0].innerText == square[2].innerText; break;
    case 3:
    case 4:
    case 5:
      isWinner = square[3].innerText !== '' && square[3].innerText == square[4].innerText && square[3].innerText == square[5].innerText; break;
    case 6:
    case 7:
    case 8:
      isWinner = square[6].innerText !== '' && square[6].innerText == square[7].innerText && square[6].innerText == square[8].innerText; break;
  }
  return isWinner;
}
const checkColumn = (index) => {
  let isWinner = false;
  switch (index) {
    case 0:
    case 3:
    case 6:
      isWinner = square[0].innerText !== '' && square[0].innerText == square[3].innerText && square[0].innerText == square[6].innerText; break;
    case 1:
    case 4:
    case 7:
      isWinner = square[1].innerText !== '' && square[1].innerText == square[4].innerText && square[1].innerText == square[7].innerText; break;
    case 2:
    case 5:
    case 8:
      isWinner = square[2].innerText !== '' && square[2].innerText == square[5].innerText && square[2].innerText == square[8].innerText; break;
  }
  return isWinner;
}
const checkBackSlash = (index) => {
  let isWinner = false;
  switch (index) {
    case 0:
    case 4:
    case 8:
      isWinner = square[0].innerText !== '' && square[0].innerText == square[4].innerText && square[0].innerText == square[8].innerText; break;
  }
  return isWinner;
}
const checkSlash = (index) => {
  let isWinner = false;
  switch (index) {
    case 2:
    case 4:
    case 6:
      isWinner = square[2].innerText !== '' && square[2].innerText == square[4].innerText && square[2].innerText == square[6].innerText; break;
  }
  return isWinner;
}
const displayPlayersTurn = () => {player.innerHTML = `${currentPlayer.text}'s turn`;};
const displayStats = () => {
  total.innerHTML = gamesPlayed;
  numOfWins.innerHTML = `{ X: ${wins.X}, O: ${wins.O} }`;
  displayPlayersTurn();
};
const determineWinner = () => {
  if (!game.isDraw()) {
    wins[currentPlayer.text]++;
  }
}
const setupGame = () => {
  displayStats();
  square.forEach((s, index) => {
    s.innerHTML = '';
    s.addEventListener('click', function() {
      if (this.innerHTML == '') {
        this.innerHTML = currentPlayer.text;
        game.takeTurn();
        if (game.isOver(index)) {
          gamesPlayed++;
          determineWinner();
          alert('Game Over');
          game.reset();
        } else {
          currentPlayer.toggle();
        }
      }
    }, {once: true});
  });
};
setupGame();