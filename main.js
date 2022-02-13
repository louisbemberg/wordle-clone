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

// game state
let gameOver = false;

let allWords = [];

async function fetchWords() {
  const wordsURL = 'https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt'

  const response = await fetch(wordsURL);

  return response.text()
}

// Logic to start the game when people reload the page
window.onload = async function() {
  allWords = await fetchWords()
  allWords = allWords.split("\n")
  correctWord = allWords[Math.floor(Math.random()*allWords.length)].toUpperCase();
  console.log('The Word is', correctWord)
  createBoard();
  newGame();
};

function createBoard() {
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
};

function newGame() {
  // Listener of Key Presses
  document.addEventListener("keyup", (e) => {
    if (gameOver) {
      console.log('Game Over!')
      return;
    }

    // Only accepting Letter Inputs from A-Z
    // only lets you write if you're not at the end of row
    if (e.code >= 'KeyA' && e.code <= 'KeyZ' && xCurrent < width) {
      const currentCell = document.getElementById(`${xCurrent.toString()}-${yCurrent.toString()}`);
      currentCell.innerText = e.code[3];
      xCurrent += 1;
    }
    // Only accept enter if full word
    if (e.code === 'Enter' && xCurrent === width ) {
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
  greenLetters = 0
  // dictionary to count letter occurences, for words like AARRG
  const frequencies = {};

  console.log(correctWord)
  for (let j = 0; j < correctWord.length; j++) {
    const letter = correctWord[j];

    if (frequencies[letter]) {
      frequencies[letter] += 1;
    } else {
      frequencies[letter] = 1;
    }
  };

  // first we scan for greens only
  for (let i = 0; i < width; i++) {
    const currentCell = document.getElementById(i.toString() + '-' + yCurrent.toString());
    const letter = currentCell.innerText;

    if (correctWord[i] === letter) {
      currentCell.classList.add('green-letter');
      greenLetters += 1;
      frequencies[letter] -= 1;
    }

    // win depends on greens only so we can check here
    if (greenLetters === width) {
      gameOver = true;
      return
    }

  };

  for (let i = 0; i < width; i++) {
      const currentCell = document.getElementById(i.toString() + '-' + yCurrent.toString());
      const letter = currentCell.innerText;

    // skip the green letters this time, only worry about yellow&grey
    if (correctWord[i] != letter) {
      if (correctWord.includes(letter) && frequencies[letter] > 0) {
        currentCell.classList.add('yellow-letter');
        frequencies[letter] -= 1;
      } else {
        currentCell.classList.add('grey-letter');
      }
    }
  }
};
