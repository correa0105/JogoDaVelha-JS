const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageText = document.querySelector("[data-winning-message-text]");
const restartButton = document.querySelector("[data-restart-button]");
restartButton.addEventListener("click", startGame);

let isCircleTurn;

const winningCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function startGame () {
    isCircleTurn = false;

    for (const cell of cellElements) {

        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);

        cell.addEventListener("click", handleClick, {once: true});
    }

    board.classList.add("x");
    board.classList.remove("circle");
    winningMessage.style.display = "none";
}

function endGame (isDraw) {
    if (isDraw) {
        winningMessageText.innerText = "Empate!";
    } else {
        winningMessageText.innerText = isCircleTurn ? "Circulo Venceu!" : "X Venceu!"; 
    }

    winningMessage.style.display = "flex";
}

function handleClick (event) {
    const cell = event.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, classToAdd) {
    cell.classList.add(classToAdd);
}

function swapTurns () {
    isCircleTurn = !isCircleTurn;

    board.classList.remove("circle");
    board.classList.remove("x");

    if(isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

function checkForWin (currentPlayer) {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        })                          
    });
}

function checkForDraw () {
    return [... cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    })
}

startGame();

