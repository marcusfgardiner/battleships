var BattleshipGrid = function (n, array) {
  this.grid = []
  this.n = n
  this.array = array
  this.buildGrid(n, array);
  this.moveCounter = 0
  this.movesArray = []
  this.possibleMoves();
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
    index = ((this.n * (y-1)) + (x-1))
    if (this.isShip(index)) {
      this.grid[index] = '@'
    }
};

BattleshipGrid.prototype.isShip = function (index) {
  return this.grid[index] === '*'
};

BattleshipGrid.prototype.isGameOver = function () {
  return !(this.grid.includes('*'))
};

BattleshipGrid.prototype.computerAttack = function () {
  randomNumberCeiling = this.grid.length
  for (i = 0; i < max ; i++) {
    this.moveCounter ++
    console.log('moveCounter', this.moveCounter)
    move = this.randomMove();
    console.log(this.movesArray)
    this.updateGridAttack(move[0], move[1]);
    if (this.isGameOver()) {
      break;
    }
  }
};

BattleshipGrid.prototype.randomMove = function () {
  randomNumber = getRandomInt(randomNumberCeiling)
  randomNumberCeiling --
  x = this.movesArray[randomNumber][0]
  y = this.movesArray[randomNumber][1]
  this.movesArray.splice(randomNumber, 1);
  return [x,y]
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

testcomputerAttack(4, [1, 1, 0, 1,0,0,0,1,0,0, 0, 1, 0, 0, 0 ,0]);
