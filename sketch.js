var myBoard;
let num = -1;
let add = false;
let solve = false;
let cursorX, cursorY;

function setup() {
  createCanvas(400, 400);
  myBoard = new Board([0, 0, 4, 9, 0, 5, 0, 8, 6, 6, 5, 2, 7, 0, 8, 0, 3, 0, 8, 0, 9, 0, 3, 6, 0, 5, 0, 0, 0, 8, 0, 0, 4, 0, 2, 7, 0, 2, 6, 0, 5, 7, 0, 0, 0, 7, 4, 0, 8, 9, 2, 1, 6, 0, 0, 8, 0, 0, 7, 9, 6, 0, 2, 2, 9, 0, 0, 0, 1, 3, 0, 0, 4, 6, 0, 0, 0, 3, 0, 0, 9]);
  clear = createButton("Reset")
  clear.position(215, 425);
  clear.mousePressed(reset);
  solveButton = createButton("Solve")
  solveButton.position(140, 425);
  solveButton.mousePressed(doSolve);
}

function draw() {
  background(220);
  myBoard.show();

  //cursor
  if (add) {
    let dist = width / 18 - 1;
    rect(width / 9 * cursorX + dist, height / 9 * cursorY + 13, 1, 20);
    if (num != -1) {
      myBoard.board[cursorX][cursorY].val = num;
      add = false;
    }
  }
  if (solve) {
    myBoard.solve();
    myBoard.checkSolution();
  }
}

function mousePressed() {
  add = true;
  if (mouseX < 400 && mouseY < 400) {
    cursorX = int(map(mouseX, 0, width, 0, 9));
    cursorY = int(map(mouseY, 0, height, 0, 9));
  }

}

function keyTyped() {
  num = key;
}

function keyReleased() {
  num = -1;
}

function reset() {
  myBoard = new Board([]);
  solve = false;
}

function doSolve() {
  solve = true;
}
