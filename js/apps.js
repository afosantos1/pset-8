///////////////////// CONSTANTS /////////////////////////////////////
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

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let scoreX = 0;
let scoreO = 0;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
const scoreXMessage = document.querySelector("h3");
const scoreOMessage = document.querySelector("h4");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  do {
    var initialPlayer = prompt("Enter X or O to declare the first player: ");
    if (initialPlayer === null) {
      turn = "X";
      break;
    } else if (initialPlayer === "X" || initialPlayer === "x") {
      turn = "X";
    } else if (initialPlayer === "O" || initialPlayer === "o") {
      turn = "O";
    } else {
      //intentially blank
    }
  } while (initialPlayer !== "X" && initialPlayer !== "x" && initialPlayer !== "O" && initialPlayer !== "o");

  win = null;

  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!"
    : win ? `${win} wins!`
    : `Turn: ${turn}`;
  if (win === "X") {
    scoreX++;
    scoreXMessage.textContent = scoreX;
  } else if (win === "O") {
    scoreO++;
    scoreOMessage.textContent = scoreO;
  } else {
    //if there is a tie, do not change score
  }
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

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
      board[condition[0]] === board[condition[2]]
    ){
        winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}
