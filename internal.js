// internal structure for the board
let board = [];
let boardSize;

// toggle function passed in from init
let htmlToggle;

// set function passed in from init
let htmlSet;

/**
 * Accepts a list of points on the board and marks all of them as
 * "alive"
 * 
 * @param {[[Number]]} pointList an Array of valid points on the board, where each point is in the form `[x,y]`
 */
let buildFromList = (pointList) => {
  pointList.forEach(point => {
    let xCoord = point[0];
    let yCoord = point[1];

    setBoardCell(xCoord, yCoord, true);
  });
};

/**
 * Builds the preset "Simple Square" on the board
 */
let makeSquare = () => {
  buildFromList([[5, 5]]);
}

/**
 * Marks the given cell as "alive" or "dead" based on the value of `liveState`
 * 
 * @param {Number} x the x-coordinate of the cell that is being set
 * @param {Number} y the y-coordinate of the cell that is being set
 * @param {Boolean} liveState if `true` marks the cell as "alive", if `false` marks the cell as "dead"
 */
let setBoardCell = (x, y, liveState) => {
  htmlSet(x, y, liveState);
  board[x][y] = liveState;
};

/**
 * Toggles the state of the given cell such that it will be marked as "alive" if the cell was dead before
 * this function call, and it will be marked as "dead" otherwise.
 * 
 * @param {Number} x the x-coordinate of the cell that is being toggled
 * @param {Number} y the y-coordinate of the cell that is being toggled
 */
let toggleBoardCell = (x, y) => {
  htmlToggle(x, y);
  board[x][y] = !board[x][y];
};

// Mapping of all preset games to the functions that make them
let presetBoards = {
  "Simple Square": makeSquare,
};

/**
  * Returns an array of names of preset configurations to be offered.
  */
function presets(){
  return Object.keys(presetBoards);
}

/**
  * Initializes the initial internal board state with all white cells given the size of the board
  * This function is called when the board is first initialized.
  *
  * n: The side length of the board
  * toggleHTMLCell(x,y): a function that toggles the shading on the cell on the x-th row and y-th column  
  * setHTMLCell(x,y,liveState): a function that sets the shading on the cell on the x-th row and y-th column 
  *     to black if the boolean liveState is true and white if false
  */
function init(n, toggleHTMLCell, setHTMLCell){

  // store these values so they can be used by other functions
  htmlToggle = toggleHTMLCell;
  htmlSet = setHTMLCell;
  boardSize = n;
  
  // set up the board such that all cells are dead
  for (x = 0; x < n; x++) {
    board.push([]);
    for (y = 0; y < n; y++) {
      setBoardCell(x, y, false);
    }
  }
}

/**
  * Resets the board state to its initial state with all white cells
  * This function is called when the clear button is clicked.
  */
function reset(){
  
  // iterate through the board and clear all the cells
  board.forEach((row, x) => {
    row.forEach((col, y) => {
      setBoardCell(x, y, false);
    });
  });
}

/**
  * Sets the board to a state configuration corresponding to one of the presets
  * This function is called when an item on the dropdown is selected with the selected name as the argument.
  *
  * presetName: The name of the selected preset configuration, matches on of those generated by presets()
  */
function setFromPreset(presetName){
  reset();
	presetBoards[presetName]();
}

/**
 * Takes in a coordinate on the board and returns the number of living neighbors that surround it.
 * 
 * A "neighbor" is defined as the set of cells in a 3x3 square centered on the given cell, but
 * does not include the given cell.
 * 
 * @param {Number} x the x-coordinate of the cell that is being queried
 * @param {Number} y the y-coordinate of the cell that is being queried
 * 
 * @returns {Number} the number of living neighbors of the queried cell
 */
let getNumAliveNeighbors = (x, y) => {
  
  let numAliveNeighbors = 0;

  // iterate through the square centered on the cell
  for (deltaX = -1; deltaX < 2; deltaX++) {
    for (deltaY = -1; deltaY < 2; deltaY++) {
      let neighborX = x + deltaX;
      let neighborY = y + deltaY;

      // don't consider OOB coodrinates
      if ((neighborX < 0 || neighborX >= boardSize) || (neighborX < 0 || neighborX >= boardSize)) {
        continue;
      }
      // don't count the cell itself
      if (neighborX === x && neighborY === y) {
        continue;
      }

      // the cell is counted as alive if it is `true` in the board
      if (board[neighborX][neighborY]) {
        numAliveNeighbors++;
      }
    }
  }

  return numAliveNeighbors;
}

/**
  * Runs one iteration of the game on the board
  * This function is called on a regular interval while the game is playing.
  */
function step(){

  let newBoard = [];

  console.log("stepping");
	board.forEach((row, x) => {
    newBoard.push([]);
    row.forEach((col, y) => {
      //compute the number of living neighbors for a cell
      let numNeighbors = getNumAliveNeighbors(x, y); 
      if (numNeighbors < 2) {
        newBoard[x][y] = false;
      } else if (numNeighbors == 2) {
        newBoard[x][y] = board[x][y];
      } else if (numNeighbors == 3) {
        newBoard[x][y] = true;
      } else {
        newBoard[x][y] = false;
      }
    });
  });

  board = newBoard;
}

/**
  * Toggles the cell on the x-th row and y-th column from shaded to unshaded or vice versa
  * This function is called when the cell is manually clicked by the user while the game is not running.
  */
function toggled(x, y) {toggleBoardCell(x, y);}
