const state = {
  gameElement: document.querySelector(".game"),
  cells: Array(42).fill(null),
  colours: ["Red", "Yellow"],
  winningCombinations: [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34]
  ],
  gameFinished: false,
  winner: ""
};

function drawBoard() {
  state.gameElement.innerHTML = "";
  for (let i = 0; i < 42; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    // if cell is already there re print it
    if (state.colours.includes(state.cells[i])) {
      const cellSymbol = document.createElement("div");
      cellSymbol.classList.add("symbol");
      if (state.cells[i] === "Red") {
        cellSymbol.classList.add("redCircle");
      } else {
        cellSymbol.classList.add("yellowCircle");
      }

      cell.append(cellSymbol);
    } else {
      // otherwise put a red/yellow circle as low as you can
      cell.addEventListener("click", function () {
        // if game is finished dont let click do anything
        if (state.gameFinished === true) {
          return;
        }

        // start from the bottom up
        for (let n = (i % 7) + 35; n > -1; n = n - 7) {
          if (state.cells[n] !== null) {
            continue;
          } else {
            state.cells[n] = state.colours[0];
            break;
          }
        }

        state.colours.reverse();
        drawBoard();
        if (checkForWinner()) {
          state.winner = state.colours[1];
          drawMessage(`${state.colours[1]} won!`);
          state.gameFinished = true;
          return;
        }

        if (checkForDraw()) {
          drawMessage("It's a Draw!");
          state.gameFinished = true;
        }
      });
    }
    state.gameElement.append(cell);
  }
}

function checkForWinner() {
  // if state.cells are all the same and not null for a state.winningCombinations then make true
  return state.winningCombinations.some(function (combo) {
    const cells = combo.map(function (index) {
      return state.cells[index];
    });
    return !cells.includes(null) && new Set(cells).size === 1; //Set is like.uniq
  });
}

function checkForDraw() {
  return state.cells.every((cell) => cell !== null);
}

function drawMessage(message) {
  const banner = document.createElement("div");
  if (state.winner === "Red") {
    banner.classList.add("redwin");
  } else if (state.winner === "Yellow") {
    banner.classList.add("yelwin");
  } else {
    banner.classList.add("drawBanner");
  }

  const h1 = document.createElement("h1");
  h1.innerHTML = message;
  banner.append(h1);
  state.gameElement.append(banner);
}

drawBoard();
// function drawScoreboard() {
//  const heading = document.createElement("h1");
//  heading.innerText = "Connect Four";
//  const paragraph1 = document.createElement("p");
//  paragraph1.innerText = "Select the row you want to place your coin.";
//  const paragraph2 = document.createElement("p");
//  paragraph2.innerText = "Red goes first.";
//  const scoreboard = document.createElement("div");
//  scoreboard.classList.add("scoreboard");
//  const scoreElement = document.createElement("span");
//  scoreElement.innerText = "score goes in here";
//  const heading3 = document.createElement("h3");
//  heading3.innerText = "Score: ";
//  heading3.append(scoreElement);
//  scoreboard.append(heading, paragraph1, paragraph2);
//  state.scoreElement = scoreElement;
//  state.element.append(scoreboard);
//}
