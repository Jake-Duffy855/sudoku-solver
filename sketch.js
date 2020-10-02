var myBoard;
let num = -1;
let add = false;
let cursorX, cursorY;

function setup() {
  createCanvas(400, 400);
  myBoard = new Board();
  clear = createButton("Reset")
  clear.position(190, 425);
  clear.mousePressed(reset);
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
  myBoard.solve();
  myBoard.checkSolution();
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
  print(6)
  myBoard = new Board();
  
}
