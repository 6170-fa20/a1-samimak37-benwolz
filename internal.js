/**
  * Returns an array of names of preset configurations to be offered.
  */
function presets(){
  console.log("presets not implemented")
  return []
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
	console.log("init not implemented");
}

/**
  * Resets the board state to its initial state with all white cells
  * This function is called when the clear button is clicked.
  */
function reset(){
	console.log("reset not implemented");
}

/**
  * Sets the board to a state configuration corresponding to one of the presets
  * This function is called when an item on the dropdown is selected with the selected name as the argument.
  *
  * presetName: The name of the selected preset configuration, matches on of those generated by presets()
  */
function setFromPreset(presetName){
	console.log("setPreset not implemented");
}

/**
  * Runs one iteration of the game on the board
  * This function is called on a regular interval while the game is playing.
  */
function step(){
	console.log("step not implemented");
}

/**
  * Toggles the cell on the x-th row and y-th column from shaded to unshaded or vice versa
  * This function is called when the cell is manually clicked by the user while the game is not running.
  */
function toggled(x, y){
	console.log("toggled not implemented");
}


