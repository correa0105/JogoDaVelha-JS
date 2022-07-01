const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageText = document.querySelector("[data-winning-message-text]");
const restartButton = document.querySelector("[data-restart-button]");
restartButton.addEventListener("click", startGame);

let isCircleTurn;

const winningCombination = [                                              //COMBINAÇÕES POSSIVEIS
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function startGame () {                                                   //FUNÇÃO QUE INICIA O JOGO
    isCircleTurn = false;                                                 //CIRCLE RECEBE FALSE POIS O INICIO DO JOGO A VEZ É DO X

    for (const cell of cellElements) {                                    //COLOCA EM CADA CELLELEMENTS UMA CONSTANC CELL

        cell.classList.remove("circle");                                  //REMOVE A CLASSE CIRCLE DE TODOS CELULAS
        cell.classList.remove("x");                                       //REMOVE A CLASSE X DE TODOS CELULAS
        cell.removeEventListener("click", handleClick);                   //REMOVE O EVENTO DE CLICK DE TODOS CELULAS

        cell.addEventListener("click", handleClick, {once: true});        //ADICIONA EVENTO DE CLICK EM TODOS CELULAS
    }

    board.classList.add("x");                                             //ADD A CLASSE X NA BOARD POIS A VEZ É DO X
    board.classList.remove("circle");                                     //REMOVE A CLASSE CIRCLE DA BOARD POIS QUANDO REINICIA O JOGO NAO FICAR 2 CLASSES NA BOARD
    winningMessage.style.display = "none";                                //SEMPRE QUE O JOGO COMEÇA O DISPLAY DE FINAL DE JOGO É NONE
}

function endGame (isDraw) {                                               //RECEBE O ARGUMENTO EMPATE
    if (isDraw) {                                                         //SE EMPATE FOR VERDADEIRO
        winningMessageText.innerText = "Empate!";
    } else {                                                              //SE AMPATE FOR FALSO
        winningMessageText.innerText = isCircleTurn ? "Circulo Venceu!" : "X Venceu!"; 
    }

    winningMessage.style.display = "flex";
}

function handleClick (event) {                                            //FUNÇÃO QUE DETERMINA AONDE VAI SER ADICIONADO A CLASSE
    const cell = event.target;                                            //CAPTURA O CLICK
    const classToAdd = isCircleTurn ? "circle" : "x";                     //SE O CIRCULO FOR VERDADEIRO ADICIONA CIRCLE RECEBE CIRCLE SE FOR FALSE RECEBE X

    placeMark(cell, classToAdd);                                          //CHAMA A FUNÇÃO COM O TARGET DO CLICK E A CLASSE A SER ADICIONADA

    const isWin = checkForWin(classToAdd);                                //IS WIN RECEBE O TESTE DE VERDADEIRO OU FALSO COM O PLAYER ATUAL
    const isDraw = checkForDraw();                                        //IS DRAW RECEBE A FUNÇÃO PARA TESTE DE EMPATE

    if (isWin) {                                                          //SE IS WIN FOR VERDADEIRO
        endGame(false);                                                   //ENDGAME RECEBE FALSE
    } else if (isDraw) {                                                  //SE IS DRAW FOR VERDADEIRO
        endGame(true);                                                    //ENDGAME RECEBE TRUE
    } else {                                                              //SE NÃO
        swapTurns();                                                      //APENAS TROCA O TURNO
    }
}

function placeMark(cell, classToAdd) {                                    //FUNÇÃO QUE ADICIONA A CLASSE CELULA
    cell.classList.add(classToAdd);
}

function swapTurns () {                                                   //FUNÇÃO QUE TROCA O TURNO DO JOGADOR
    isCircleTurn = !isCircleTurn;                                         //IS CIRCLE RECEBE O CONTRARIO DO BOOLEAN ATUAL

    board.classList.remove("circle");                                     //REMOVE A CLASSE CIRCLE DA BOARD
    board.classList.remove("x");                                          //REMOVE A CLASSE X DA BOARD

    if(isCircleTurn) {                                                    //SE IS CIRCLE TURN FOR VERDADEIRO
        board.classList.add("circle");                                    //ADICIONA A CLASSE CIRCLE NO BOARD
    } else {
        board.classList.add("x");                                         //ADICIONA A CLASSE X NO BOARD
    }
}

function checkForWin (currentPlayer) {                                    //CHECKA SE FOI UMA VITÓRIA
    return winningCombination.some(combination => {                       //FUNÇÃO SOME TESTA SE AO MENOS UM ARRAY PASSA NO TESTE IMPLEMENTADO
        return combination.every(index => {                               //FUNÇÃO EVERY TESTA SE TODOS ELEMENTOS DO ARRAY PASSAM NO TESTE IMPLEMENTADO
            return cellElements[index].classList.contains(currentPlayer); //VERIFICA SE CADA CELULA CONTAIN O CURRENTPLAYER (QUE PODE SER A CLASSE X OU CIRCLE)
        })                          
    });
}

function checkForDraw () {                                                //FUNÇÃO RETORNA VERDADEIRO SE TODAS AS CELULAS ESTIVEREM PREENCHIDAS COM A CLASSE "X" OU "CIRCLE"
    return [... cellElements].every(cell => {                             //TORNA CELLELEMENTS UM ARRAY, E DEPOIS VERIFICA SE TODAS AS CELULAS ATRAVES DE UMA CONDIÇÃO
        return cell.classList.contains("x") || cell.classList.contains("circle");
    })
}

startGame();

