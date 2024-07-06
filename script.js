//prendo bottoni per giocare nella due diverse modalità
const playerComBtn = document.getElementById("playerCom");
const comComBtn = document.getElementById("comCom");

//array di mosse
const moves = ["carta", "forbice", "sasso"];

//variabili dove salvare mosse fatte
let playerMove;
let computerMove;

//funzione per mostrare il campo da gioco
function showPlayground() {
    const playground = document.getElementById("playground");
    playground.className = "text-center mt-4";
}

//mostro seione di gioco al click su bottone PvC
playerComBtn.addEventListener("click", () => {
    console.log("Player vs Computer");
    showPlayground();
    playerOne();
    playerMovesGen();
    playerChoice();
    computerChoice()
})

//funzione per generare i bottoni delle mosse per utente
function playerMovesGen() {
    const playerMoves = document.getElementById("player");
    for (let i = 0; i < moves.length; i++) {
        playerMoves.innerHTML += `
        <div class="play-button m-2 text-center text-capitalize choice-btn" id="${i}">${moves[i]}</div>
        `;
    }
}

//funzione per generare nome del player1
function playerOne(){
    const player1 = document.getElementById("player-1");
    player1.innerText = "Tu";
}

function playerChoice(){
    const playerMoves = document.querySelectorAll(".choice-btn");
    playerMoves.forEach(button => {
        button.addEventListener("click", (e) => {
            console.log(e.target.id);
            playerMove = moves[e.target.id];
            console.log(playerMove);
        });
    });
}

function computerChoice(){
    computerMove = RndNumberGen(0, moves.length);
    console.log(computerMove);
}