class Board {
	constructor() {
    let nums = [0,0,4,9,0,5,0,8,6,6,5,2,7,0,8,0,3,0,8,0,9,0,3,6,0,5,0,0,0,8,0,0,4,0,2,7,0,2,6,0,5,7,0,0,0,7,4,0,8,9,2,1,6,0,0,8,0,0,7,9,6,0,2,2,9,0,0,0,1,3,0,0,4,6,0,0,0,3,0,0,0];
    this.board = [];
		for (let i = 0; i < 9; i++) {
      this.board[i] = [];
			for (let j = 0; j < 9; j++) {
				this.board[i][j] = new Square(i, j, 0);
                //this.board[i][j] = new Square(i, j, nums[9 * j + i]);
			}
 		}
	}
	
	show() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
        noFill();
        strokeWeight(3);
        rect(i % 3 * width / 3, j % 3 * height / 3, width /3 -1, height /3 -1);
				strokeWeight(1);
        rect(width/9 * i, height/9 * j, width / 9-1, height/9-1);
        fill(0);
        textSize(30);
        let a = this.board[i][j].val;
        if (a > 0) {
        	text(this.board[i][j].val, width/9 * i+14, height/9 * j+33);
        }
			}
		}
	}

	solve() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
        this.board[i][j].check(this.board);
      }
    }
	}
	
	checkSolution() {
		let solved = true;
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				let correct = true;
				let num = this.board[row][col].val;
        //row
				for (let i = 0; i < 9; i++) {
					if (this.board[row][i].val == num && i != col) {
						solved = false;
						correct = false;
					}
				}
				//column
				for (let i = 0; i < 9; i++) {
					if (this.board[i][col].val == num && i != row) {
						solved = false;
						correct = false;
					}
				}
				//box
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 3; j++) {
						let x = (row + i) % 3 + 3 * int(row / 3);
						let y = (col + j) % 3 + 3 * int(col / 3);
						let num2 = this.board[x][y].val;
						if (num2 == num && (i != 0 || j != 0)) {
							solved = false;
							correct = false;
						}
					}
				}
				if (!correct && num != 0) {
					fill(255,0,0,100);
					rect(this.board[row][col].x * width/9, this.board[row][col].y * height/9,width / 9-1, height/9-1);
				}
      }
    }
	}
	
}