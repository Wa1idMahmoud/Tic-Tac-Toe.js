/* This document querySelector will select anything in the parameters and the # means the ID of game board */
const gameBoard = document.querySelector('#gameboard')

/* we will pick out the info id that is marked with # */
const infoDisplay = document.querySelector('#info')

/* This will be the start cells, the empty boxes for the x o to go. */
const startCells = [
    "", "", "", "", "", "", "", "", ""
]

/* This will start the circle div to be placed in the square*/
let go ="circle"

/* This will display on the bottom whos turn it is */
infoDisplay.textContent = "Circle goes first!"

/* create a function that calls the array startCells to call the cells and indexs, Then creating an element cell div.  */
/* when creating 9 elements you want to add it to the class square */
function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
}

createBoard()


function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)

    /* This will check to see if go equals the sting circle, then we change to cross, otherwise of not keep it circle, then assign and over ride to variable go.  */
    go = go === "circle" ? "cross" : "circle"
    /* This will then display the text telling the user its cross's turn. */
    infoDisplay.textContent = "it is now " + go + "'s go. "
    /* This will then remove the ability to click on the box twice. */
    e.target.removeEventListener("click", addGo)
    checkScore()
}

/* This is going to check and save the scores */
function checkScore() {
    /* This will check each time the squares and look whats inside it. */
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        /* These are all the winnings going horizontal*/
        [0,1,2], [3,4,5], [6,7,8],
        /* These are all the winnings going vertical */
        [0,3,6], [1,4,7], [2,5,8],
        /* These are all the winnings going diagonal */
        [0,4,8], [2,4,6],
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })
    
    winningCombos.forEach(array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))
    
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
        
    })
}

/* This will create a button to refresh or reset the game */
const resetButton = document.createElement('button');
resetButton.textContent = "Reset Game";
resetButton.addEventListener("click", resetGame);
document.body.appendChild(resetButton);

/* This function will reset the game by reloading the page */
function resetGame() {
    location.reload();
}
