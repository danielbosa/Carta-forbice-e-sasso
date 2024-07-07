//VARIABILI
//prendo bottoni per giocare nella due diverse modalità
const playerComBtn = document.getElementById("playerCom");
const comComBtn = document.getElementById("comCom");

//prendo elemento per mostrare nomi giocatori
const player1 = document.getElementById("player-1-name");
const player2 = document.getElementById("player-2-name");

//prendo elementi per mostrare i bottoni delle mosse
const playerOneMoves = document.getElementById("player-1-moves");
const playerTwoMoves = document.getElementById("player-2-moves");

//prendo elemento per mostrare risultato
const resultSection = document.getElementById("resultSection");
const result = document.getElementById("result");

//variabili dove salvare mosse fatte dai due giocatori
let playerOneMove;
let playerTwoMove;

//variabile dove salvare modalità scelta
let mode;

//variabile flag per gestire se prima partita in modalità vs Computer
let firstPlayerGame = false;

//array di mosse, estendibile
const moves = ["carta", "forbice", "sasso"];

//mappa combinazioni vincenti
const winningCombinations = {
    "carta": "sasso",
    "forbice": "carta",
    "sasso": "forbice"
};

//mappa messaggi in base al risultato
const messages = {
    "draw": "Pareggio",
    "win": "Vittoria! Hai battuto il computer",
    "lose": "Sconfitta! Il computer ti ha battuto"
};

//EVENTI PRINCIPALI ASCOLTATI
//ascolto click per modalità giocatore vs computer
playerComBtn.addEventListener("click", () => {
    mode = "playerCom";
    playerComBtn.classList.add("active");
    comComBtn.classList.remove("active");
    playGame()
})

//ascolto click per modalità computer vs computer
comComBtn.addEventListener("click", () => {
    mode = "comCom";
    messages['win'] = "Computer 1 vince!";
    messages['lose'] = "Computer 2 vince!";
    comComBtn.classList.add("active");
    playerComBtn.classList.remove("active");
    playGame()
})

//FUNZIONI DI GIOCO
//raccolgo funzioni necessarie al gioco
function playGame() {
    showPlayground();
    setPlayerName();
    playersChoices();
}

//per mostrare il campo da gioco
function showPlayground() {
    const playground = document.getElementById("playground");
    playground.className = "text-center mt-4";
    resultSection.classList.add("d-none");
}
//per generare nomi dei giocatori in base a modalità
function setPlayerName() {
    if (mode === "playerCom") {
        player1.innerText = "Tu";
        player2.innerText = "Computer";
    } else {
        player1.innerText = "Computer-1";
        player2.innerText = "Computer-2";
    }

}

//gestione di intera partita in base a modalità di gioco scelta
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

//per generare i bottoni mosse per utente umano
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

//gestione partita utente vs computer
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

//gestione partita computer vs computer
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

//mostra sezione e messaggi di vittoria o sconfitta
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

//per dis/abilitare i click sui bottoni (usata durante i timeout)
function handleClicks() {
    const clickableItems = document.querySelectorAll(".play-button");
    clickableItems.forEach(button => {
        button.classList.toggle("disabled");
    });
}

//autoscroll in fondo alla pagina al risultato
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

//determina giocatore vincitore in base a mappe di winningCombinations
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