//VARIABLES
//playmode buttons
const playerComBtn = document.getElementById("playerCom");
const comComBtn = document.getElementById("comCom");

//els where to show players names
const player1 = document.getElementById("player-1-name");
const player2 = document.getElementById("player-2-name");

//els where to show players moves
const playerOneMoves = document.getElementById("player-1-moves");
const playerTwoMoves = document.getElementById("player-2-moves");

//el where to show result
const resultSection = document.getElementById("resultSection");
const result = document.getElementById("result");

//variables where to save players choosen moves
let playerOneMove;
let playerTwoMove;

//var where to store game mode
let mode;

//flag to handle if first time in player vs Computer mode
let firstPlayerGame = false;

//DATA
//array of possible moves
const moves = ["carta", "forbice", "sasso"];

//winning combination map
const winningCombinations = {
    "carta": "sasso",
    "forbice": "carta",
    "sasso": "forbice"
};

//messages map
const messages = {
    "draw": "Pareggio",
    "win": "Vittoria! Hai battuto il computer",
    "lose": "Sconfitta! Il computer ti ha battuto"
};

//PRINCIPAL EVENT LISTENERS
//human vs computer mode listener
playerComBtn.addEventListener("click", () => {
    mode = "playerCom";
    playerComBtn.classList.add("active");
    comComBtn.classList.remove("active");
    playGame()
})

//computer vs computer mode listener
comComBtn.addEventListener("click", () => {
    mode = "comCom";
    messages['win'] = "Computer 1 vince!";
    messages['lose'] = "Computer 2 vince!";
    comComBtn.classList.add("active");
    playerComBtn.classList.remove("active");
    playGame()
})

//GAME FUNCTION
//gather all function to play
function playGame() {
    showPlayground();
    setPlayerName();
    playersChoices();
}

//to show playground
function showPlayground() {
    const playground = document.getElementById("playground");
    playground.className = "text-center mt-4";
    resultSection.classList.add("d-none");
}
//to set player names based on chosen mode
function setPlayerName() {
    if (mode === "playerCom") {
        player1.innerText = "Tu";
        player2.innerText = "Computer";
    } else {
        player1.innerText = "Computer-1";
        player2.innerText = "Computer-2";
    }

}

//whole game in base to chosen mode
function playersChoices() {
    if (mode === "playerCom") {
        playerMovesGen();
        const playerMoves = document.querySelectorAll(".choice-btn");
        playerMoves.forEach(button => {
            button.addEventListener("click", handleHumanMove);
        });
    } else if (mode === "comCom") {
        handleComputerGame();
    }
}

//to create buttons for human moves
function playerMovesGen() {
    playerOneMoves.innerHTML = "";
    let btnMoveList = document.createElement("div");
    btnMoveList.className = "d-flex justify-content-around";
    for (let i = 0; i < moves.length; i++) {
        let btnMove = document.createElement("div");
        btnMove.className = "play-button choice-btn";
        btnMove.setAttribute("id", i);
        btnMove.innerText = moves[i];
        btnMoveList.appendChild(btnMove);
    }
    playerOneMoves.innerHTML = `<div class="text-center mb-2">Scegli la tua mossa</div>`;
    playerTwoMoves.innerHTML = `Sta scegliendo... ⏳`;
    playerOneMoves.append(btnMoveList);
}

//handle human vs computer
function handleHumanMove(e) {
    playerTwoMoves.innerHTML = `Sta scegliendo... ⏳`;
    if (firstPlayerGame) {
        prevChoice = document.querySelector(".choice-btn.active");
        prevChoice.classList.remove("active");
    }
    firstPlayerGame = true;
    e.target.classList.add("active");
    playerOneMove = moves[e.target.id];
    playerTwoMove = moves[RndNumberGen(0, moves.length)];
    handleClicks();
    setTimeout(function () {
        winner();
    }, 2000);
    setTimeout(() => {
        playerTwoMoves.innerText = `✅ Scelta fatta!`
    }, 1000);
}

//handle computer vs computer
function handleComputerGame() {
    firstPlayerGame = false;
    playerOneMoves.innerHTML = `Sta scegliendo... ⏳`;
    playerTwoMoves.innerHTML = `Sta scegliendo... ⏳`;
    playground.classList.add("mb-5");
    playerOneMove = moves[RndNumberGen(0, moves.length)];
    playerTwoMove = moves[RndNumberGen(0, moves.length)];
    handleClicks();
    setTimeout(function () {
        winner();
    }, 2000);
    setTimeout(() => {
        playerOneMoves.innerText = `✅ Scelta fatta!`
        playerTwoMoves.innerText = `✅ Scelta fatta!`
    }, 1000);
}

//show result section
function showMoves() {
    const selectedMoves = document.getElementById("selectedMoves");
    selectedMoves.innerText = `${playerOneMove} vs ${playerTwoMove}`;

    const playAgain = document.getElementById("playAgain");
    if (mode === "playerCom") {
        playAgain.innerText = "Scegli un'altra mossa per giocare ancora, oppure cambia modalità di gioco";
    } else if (mode === "comCom") {
        playAgain.innerText = 'Clicca ancora sul bottone "Computer vs Computer" per giocare un\'altra partita, oppure cambia modalità di gioco';
    }

}

//to disable/enable btn clicks (used during timeouts)
function handleClicks() {
    const clickableItems = document.querySelectorAll(".play-button");
    clickableItems.forEach(button => {
        button.classList.toggle("disabled");
    });
}

//autoscroll to bottom when result
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

//who wins based on winningCombinations
function winner() {
    resultSection.classList.remove("d-none");
    if (playerOneMove === playerTwoMove) {
        result.innerText = messages.draw;
    } else if (winningCombinations[playerOneMove] === playerTwoMove) {
        result.innerText = messages.win;
    } else {
        result.innerText = messages.lose;
    };
    showMoves();
    handleClicks();
    scrollToBottom();
}