const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board;
let turn;
let win;
let started;
let xScore = 0;
let yScore = 0;

const squares = Array.from(document.querySelectorAll("#board div"));
const turnChoice = document.getElementById("turnChoice");
const turnUpdate = document.getElementById("turnUpdate");
const scores = document.getElementById("scorekeeper");
const turnButtons = document.getElementById("turnButtons");

window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

function addEventListeners() {
    turnButtons.addEventListener("click", function(event) {
        let clicked = event.target;

        if (clicked.id == "xButton" && !started) {
            turn = "X";
            started = true;
            render();
        }
        if (clicked.id == "oButton" && !started) {
            turn = "O";
            started = true;
            render();
        }
    });
}

function init() {
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    turn = "?";
    win = null;
    started = false;

    addEventListeners();
    render();
}

function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark;
    });

    scores.textContent = `X TOTAL WINS: ${xScore} | O TOTAL WINS: ${yScore}`;
    xButton.textContent = "X";
    oButton.textContent = "O";
    turnUpdate.textContent = (win === "T" ? `TIE GAME` : (win ? `${win} WINS` : `TURN: ${turn}`));
}

n takeTurn(event) {
    if (started) {
        let index;
        if (!win) {
            index = squares.findIndex(function(square) {
                return square === event.target;
            });
        }

        if (board[index] === "") {
            board[index] = turn;
            turn = turn === "X" ? "O" : "X";
            win = getWinner();

            render();
        }
    }
}

function getWinner() {
    let winner = null;

    winningConditions.forEach(function(condition, index) {
        if (
            board[condition[0]] &&
            board[condition[0]] === board[condition[1]] &&
            board[condition[1]] === board[condition[2]]
        ) {
            winner = board[condition[0]];
            if (winner === "X") {
                xScore++;
            }
            if (winner === "O") {
                yScore++;
            }
        }
    });

    return winner ? winner : board.includes("") ? null : "T";
}
