var BattleshipGrid = function (n, array) {
  this.grid = []
  this.n = n
  this.array = array
  this.buildGrid(n, array);
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
    if (this.grid[index] === '*') {
      this.grid[index] = '@'
    }
};

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
