class Square {
	constructor (x_, y_, val_) {
		this.x = x_;
		this.y = y_;
    this.val = val_;
    this.possible = [1,2,3,4,5,6,7,8,9];
    this.keep = 0;
	}
  
  check(board) {
    let num;
    let index;
    let must;
    this.keep = this.val;
    
    //row
    for (let i = 0; i < 9; i++) {
      num = int(board[i][this.y].val);
      index = this.possible.indexOf(num);
      if (i != this.x && num > 0 && index > -1) {
        this.possible.splice(index, 1);
      }
    }
    //col
    for (let j = 0; j < 9; j++) {
      num = int(board[this.x][j].val);
      index = this.possible.indexOf(num);
      if (j != this.y && num > 0 && index > -1) {
        this.possible.splice(index, 1);
      }
    }
    
    //box
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let indexX = (this.x + i) % 3 + 3 * int(this.x / 3);
        let indexY = (this.y + j) % 3 + 3 * int(this.y / 3);
        num = int(board[indexX][indexY].val);
      	index = this.possible.indexOf(num);
      	if ((indexX != this.x || indexY != this.y) && num > 0 && index > -1) {
        	this.possible.splice(index, 1);
      	}
      }
    }
    
    //naked pair row
    //if possible length is 2 check row col square
    //if other possible == possible, remove those nums from all other posses
    if (this.possible.length == 2) {
      for (let i = 0; i < 9; i++) {
        if (i != this.x) {
        	if (board[i][this.y].possible.length == 2) {
        		if (this.possible[0] == board[i][this.y].possible[0] && this.possible[1] == board[i][this.y].possible[1]) {
            	let a = this.possible[0];
              let b = this.possible[1];
              for (let j = 0; j < 9; j++) {
        				if (j != this.x && j != board[i][this.y].x) {
                  num = int(a);
      						index = board[j][this.y].possible.indexOf(num);
     							if (index > -1) {
      	  					board[j][this.y].possible.splice(index, 1);
       						}
                  num = int(b);
      						index = board[j][this.y].possible.indexOf(num);
     							if (index > -1) {
      	  					board[j][this.y].possible.splice(index, 1);
       						}
                }
              }
            }
          }
        }
      }
    }
    
    //naked pair col
    if (this.possible.length == 2) {
      for (let i = 0; i < 9; i++) {
        if (i != this.y) {
        	if (board[this.x][i].possible.length == 2) {
        		if (this.possible[0] == board[this.x][i].possible[0] && this.possible[1] == board[this.x][i].possible[1]) {
            	let a = this.possible[0];
              let b = this.possible[1];
              for (let j = 0; j < 9; j++) {
        				if (j != this.y && j != board[this.x][i].y) {
                  num = int(a);
      						index = board[this.x][j].possible.indexOf(num);
     							if (index > -1) {
      	  					board[this.x][j].possible.splice(index, 1);
       						}
                  num = int(b);
      						index = board[this.x][j].possible.indexOf(num);
     							if (index > -1) {
      	  					board[this.x][j].possible.splice(index, 1);
       						}
                }
              }
            }
          }
        }
      }
    }

    //naked pair square
    if (this.possible.length == 2) {
      for (let i = 0; i < 3; i++) {
      	for (let j = 0; j < 3; j++) {
        	if (i != 0 || j != 0) {
	        	let indexX = (this.x + i) % 3 + 3 * int(this.x / 3);
  	      	let indexY = (this.y + j) % 3 + 3 * int(this.y / 3);
    	    	if (board[indexX][indexY].possible.length == 2) {
      	  		if (this.possible[0] == board[indexX][indexY].possible[0] && this.possible[1] == board[indexX][indexY].possible[1]) {
        	    	let a = this.possible[0];
          	    let b = this.possible[1];
            	  for (let k = 0; k < 3; k++) {
				      		for (let l = 0; l < 3; l++) {
        						if (k != 0 || l != 0) {
					    	    	let indexX2 = (this.x + k) % 3 + 3 * int(this.x / 3);
  	    					  	let indexY2 = (this.y + l) % 3 + 3 * int(this.y / 3);
                      if (indexX != indexX2 || indexY != indexY2) {
	                	  	num = int(a);
  	    								index = board[indexX2][indexY2].possible.indexOf(num);
    	 									if (index > -1) {
      		  							board[indexX2][indexY2].possible.splice(index, 1);
       									}
          	      		  num = int(b);
      									index = board[indexX2][indexY2].possible.indexOf(num);
     										if (index > -1) {
      	  								board[indexX2][indexY2].possible.splice(index, 1);
       									}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    //hidden pair row
    //this doesnt work yet i have no idea why?????
    for (let i = 0; i < 9; i++) {
      let inCommon = [];
      if (i != this.x) {
        for (let k = 0; k < board[i][this.y].possible.length; k++) {
          if (this.possible.includes(board[i][this.y].possible[k])) {
            inCommon.push(board[i][this.y].possible[k]);
          }
        }
        if (this.x == 2 && this.y == 8) {
          //print([inCommon,i,this.possible]);
        }
        if (inCommon.length == 2) {
          let hidden = true;
          for (let j = 0; j < 9; j++) {
            if (j != this.x && j != i) {
              for (let k = 0; k < inCommon.length; k++) {
                if (board[j][this.y].possible.includes(inCommon[k])) {
                  hidden = false;
                }
              }
            }
          }
          if (hidden) {
         		this.possible = [inCommon[0],inCommon[1]];
          	board[i][this.y].possible = [inCommon[0],inCommon[1]];
          }
        }
      }
    }
    
    //must row
    must = [1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < 9; i++) {
      if (this.x != i) {
        for (let j = 0; j < board[i][this.y].possible.length; j++) {
      		num = int(board[i][this.y].possible[j]);
      		index = must.indexOf(num);
     			if (index > -1) {
      	  	must.splice(index, 1);
       		}
      	}
      }
    }
    if (must.length == 1) {
      this.val = must[0];
    }
     
    //must col
    must = [1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < 9; i++) {
      if (this.y != i) {
        for (let j = 0; j < board[this.x][i].possible.length; j++) {
      		num = int(board[this.x][i].possible[j]);
      		index = must.indexOf(num);
     			if (index > -1) {
      	  	must.splice(index, 1);
       		}
      	}
      }
    }
    if (must.length == 1) {
      this.val = must[0];
    }
    
    //must square
    must = [1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i != 0 || j != 0) {
        	let indexX = (this.x + i) % 3 + 3 * int(this.x / 3);
        	let indexY = (this.y + j) % 3 + 3 * int(this.y / 3);
          for (let k = 0; k < board[indexX][indexY].possible.length; k++) {
      			num = int(board[indexX][indexY].possible[k]);
      			index = must.indexOf(num);
     				if (index > -1) {
      	  		must.splice(index, 1);
       			}
          }
        }
      }
    }
    if (must.length == 1) {
      this.val = must[0];
    }
    
    if (this.possible.length == 1) {
      this.val = this.possible[0];
    }
      
    if (this.val > 0) {
      this.possible = [int(this.val)];
    }
    
    if (this.keep > 0) {
      this.val = this.keep;
    }
  }
}