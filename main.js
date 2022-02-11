// current location of the user on the board
// starts  on top left at origin (0,0)
// bottom right cell will be at (4, 5)
const xCurrent = 0;
const yCurrent = 0;

// set size of board
const width = 5;
const height = 6;

const playing = false;
const correct_word = 'BEANS'

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
      cell.id = `${row.toString()}-${column.toString()}`
      cell.classList.add('cell');
      // I think this line may be useless lol
      cell.innerText = 'A';
      document.querySelector('.board-section').appendChild(cell);
    }
  }


  // Listener of Key Presses
  document.addEventListener("keyup", e) => {
    if (gameOver) return;

    // Only accept enter if full word
    if (e.code == 'Enter' && xCurrent === (width - 1) {
      // call function that checks the letters in the row
      checkRow();
      // go to beginning of next row
      yCurrent += 1;
      xCurrent = 0
      console.log('Current position:', xCurrent, yCurrent)
    }

    // End of game
  };
};
