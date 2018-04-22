var BattleshipGrid = function (n, array) {
  this.grid = []
  this.n = n
  this.array = array
  this.buildGrid(n, array);
  this.moveCounter = 0
  this.movesArray = []
  this.possibleMoves();
  this.randomNumberCeiling = this.grid.length
}

BattleshipGrid.prototype.buildGrid = function (n, array) {
  newGrid = this
  array.map(function(element, i) {
    newGrid.grid.push(newGrid.dotsStars(element));
  });
}

BattleshipGrid.prototype.printGrid = function () {
  let splicePoint = this.n
  let extra = 0
  printedGrid = this.grid
  for (i = 0; i < (this.n - 1); i++) {
    printedGrid.splice((splicePoint * (i+1) + extra), 0, '\n')
    extra++
  }
  return printedGrid.join('')
};

BattleshipGrid.prototype.dotsStars = function (element) {
  if ( element === 0 ) {
    return '.'
  }
  else {
    return '*'
  }
};

BattleshipGrid.prototype.updateGridAttack = function (x, y) {
    if (this.isShip(x, y)) {
      this.grid[index] = '@'
    }
};

BattleshipGrid.prototype.isShip = function (x, y) {
  index = ((this.n * (y-1)) + (x-1))
  return (this.grid[index] === '*')
};

BattleshipGrid.prototype.isGameOver = function () {
  return !(this.grid.includes('*'))
};

BattleshipGrid.prototype.computerAttack = function () {
  for (i = 0; i < max ; i++) {
    if (this.isGameOver()) {
      console.log('GAME OVER')
      console.log(this.printGrid())
      process.exit(55-i)//exit code = 45
      console.log('Process exited')
    }

    randomNumber = getRandomInt(this.randomNumberCeiling)

    x = this.movesArray[randomNumber][0]
    y = this.movesArray[randomNumber][1]

    isSuccess = this.move(x, y, randomNumber);

    if (isSuccess) {
      console.log('attempt TARGETED move')
      this.targetedMove(x, y, randomNumber);
    };
    console.log(this.movesArray)
  }
};

BattleshipGrid.prototype.targetedMove = function (x, y, number, y_switch) {
  movesArrayString = JSON.stringify(this.movesArray);
  nextMoveStringX = JSON.stringify([x + 1, y]);
  nextMoveStringY = JSON.stringify([x, y + 1]);
  if (movesArrayString.indexOf(nextMoveStringX) !== -1 && y_switch !== true) {
    console.log('X AXIS TARGETED MOVE IS POSSIBLE')
    console.log('NEXT MOVE X',nextMoveStringX)
    isSuccess = this.move(x + 1, y, number);
    if (isSuccess) {
      console.log('X AXIS TARGETED MOVE HIT TARGET')
      console.log('ATTEMPT X NESTED TARGETED move')
      this.targetedMove(x + 1, y, number);
    }
  else {
    console.log('X Axis targeted move not possible. Y AXIS Target attempt')
    console.log('NEXT MOVE Y',nextMoveStringY)
    if (movesArrayString.indexOf(nextMoveStringY) !== -1) {
      console.log('Y AXIS MOVE is possible')
      isSuccess = this.move(x, y + 1, number);
      if (isSuccess) {
        console.log('Y AXIS TARGETED MOVE HIT TARGET')
        console.log('ATTEMPT Y NESTED TARGETED move')
        this.targetedMove(x, y + 1, number, true);
      }
    }
  }
  };
};

BattleshipGrid.prototype.move = function (x, y, number) {
  if (this.isGameOver()) {
    console.log('GAME OVER')
    console.log(this.printGrid())
    process.exit(55-i)//exit code = 45
    console.log('Process exited')
  }
  this.moveCounter ++
  console.log('Number of moves',this.moveCounter)

  this.randomNumberCeiling --
  let isHit = false
  if (this.isShip(x, y)) {
    console.log('SHHIPP!')
    isHit = true
  };
  this.updateGridAttack(x, y);
  this.movesArray.splice(number, 1);
  return isHit
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

BattleshipGrid.prototype.possibleMoves = function () {
  x = 1
  y = 1
  n = this.n + 1
  max = this.grid.length
  console.log(this.movesArray)
  for (i = 0; i < max ; i++) {
    this.movesArray.push([x,y])
    x++
    if (x === n) {
      x = 1;
      y ++
      };
  }
};

let testPossibleMoves = function (n, array) {
  newGrid = new BattleshipGrid(n, array);
  newGrid.possibleMoves();
  console.log('moves', newGrid.movesArray)
  let output = newGrid.printGrid();
  console.log(output)
};

testPossibleMoves(4, [1, 1, 0, 1,0,0,0,1,0,0, 0, 1, 0, 0, 0 ,0]);

let testGrid = function (n, array) {
  newGrid = new BattleshipGrid(n, array);
  let output = newGrid.printGrid();
  console.log(output)
  if (output === '.*.\n.*.\n***') {
    console.log('Grid','Test passed')
  }
  else { console.log('Grid','Test failed') }
};

testGrid(3, [0, 1, 0, 0,1,0,1,1,1]);

let testHitShip = function (n, array, x, y) {
  newGrid = new BattleshipGrid(n, array);
  newGrid.updateGridAttack(x, y)
  let output = newGrid.printGrid();
  console.log(output)
  if (output === '.*.\n.@.\n***') {
    console.log('Attack Test passed')
  }
  else { console.log('Attack Test failed') }
};

testHitShip(3, [0, 1, 0, 0, 1, 0, 1, 1, 1], 2, 2);

let testGameOver = function (n, array, x, y) {
  newGrid = new BattleshipGrid(n, array);
  newGrid.updateGridAttack(x, y)
  gameOver = newGrid.isGameOver();
  console.log(gameOver)
  let output = newGrid.printGrid();
  console.log(output)
  if (gameOver === true) {
    console.log('Game over - test passed')
  }
  else { console.log('Game over - test failed') }
};

testGameOver(3, [0, 0, 0, 0, 0, 0, 0, 1, 0], 2, 3);

let testcomputerAttack = function(n, array) {
  newGrid = new BattleshipGrid(n, array);
  newGrid.computerAttack();
  gameOver = newGrid.isGameOver();
  console.log(gameOver)
  let output = newGrid.printGrid();
  console.log(output)
  if (gameOver === true) {
    console.log('Computer game over - test passed')
  }
  else { console.log('Computer game over - test failed') }
};

testcomputerAttack(4, [1, 1, 1, 1,1,0,0,1,1,0, 0, 1, 1, 0, 0 ,0]);
