// current location of the user on the board
// starts  on top left at origin (0,0)
// bottom right cell will be at (4, 5)
// ----> X
// |
// |
// |
// Y
let xCurrent = 0;
let yCurrent = 0;

// set size of board
const width = 5;
const height = 6;

let gameOver = false;

// Answer of the Puzzle
const correctWord = 'BEANS';

// dictionary to count letter occurences, for words like AARRG
const frequencies = {};

for (let j = 0; j < correctWord.length; j++) {
  const letter = correctWord[j];

  if (frequencies[letter]) {
    frequencies[letter] += 1;
  } else {
    frequencies[letter] = 1;
  }
}


// Logic to start the game when people reload the page
window.onload = function() {
  startGame();
};

function startGame() {

  // populate board with empty cells
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      // creating one cell such that:
      // <div id='x-y' class='cell'>texthere</div>
      let cell = document.createElement('div');
      cell.id = `${column.toString()}-${row.toString()}`
      cell.classList.add('cell');
      // I think this line may be useless lol
      cell.innerText = '';
      document.querySelector('.board-section').appendChild(cell);
    }
  }


  // Listener of Key Presses
  document.addEventListener("keyup", (e) => {
    if (gameOver) {
      return;
      console.log('Game Over!')
    }

    // Only accepting Letter Inputs from A-Z
    // only lets you write if you're not at the end of row
    if (e.code >= 'KeyA' && e.code <= 'KeyZ' && xCurrent < width) {
      const currentCell = document.getElementById(`${xCurrent.toString()}-${yCurrent.toString()}`);
      currentCell.innerText = e.code[3];
      xCurrent += 1;
      // console.log('you Type a', e.code[3])
    }
    // Only accept enter if full word
    if (e.code === 'Enter' && xCurrent === width ) {
      console.log(xCurrent, width)
      // call function that checks the letters in the row
      checkRow();
      // go to beginning of next row
      yCurrent += 1;
      xCurrent = 0
      console.log('Current position:', xCurrent, yCurrent)
    };

    // Delete function
    if (e.code === 'Backspace') {
      if (xCurrent > 0) {
        xCurrent -= 1;
      }
      const currentCell = document.getElementById(`${xCurrent.toString()}-${yCurrent.toString()}`);
      currentCell.innerText = '';
    }

    // End of game
    if (!gameOver && yCurrent == height) {
      gameOver = true;
    }
  });
};

function checkRow() {
  // count of the correct word
  console.log(frequencies)
};
