var BattleshipGrid = function (n, array) {
  this.grid = []
  this.buildGrid(n, array);
}

BattleshipGrid.prototype.buildGrid = function (n, array) {
  newGrid = this
  array.map(function(element, i) {
    newGrid.grid.push(newGrid.dotsStars(element));
    if (newGrid.isNewGridLine(i, n, array))
      { newGrid.grid.push('\n') }
  });
  this.grid = this.grid.join('')
}

BattleshipGrid.prototype.isNewGridLine = function (i, n, array) {
  return ((i+1) % n === 0 && ((i+1) < array.length))
};

BattleshipGrid.prototype.dotsStars = function (element) {
  if ( element === 0 ) {
    return '.'
  }
  else {
    return '*'
  }
};

BattleshipGrid.prototype.isShip = function (x, y) {
  grid_array = grid.split('\n')
  row = grid_array[(y-1)]
  row_array = row.split('')
  space = row_array[(x-1)]
  if (space === '*'){
    return true
  };
};

BattleshipGrid.prototype.attack = function (grid, x, y) {
  if( isShip(grid, x, y) )
    { updated_grid = console.log(grid) }
    return updated_grid
};

let testGrid = function (n, array) {
  newGrid = new BattleshipGrid(n, array);
  let output = newGrid.grid
  console.log(output)
  if (output === '.*\n..') {
    console.log('Grid','Test passed')
  }
  else { console.log('Grid','Test failed') }
};

testGrid(2, [0, 1, 0, 0]);
//
// let testHitShip = function (n, array, x, y) {
//   newGrid = new BattleshipGrid(n, array);
//   let output = newGrid.grid
//   let hitOutput = attack(x, y)
//   if (hitOutput === '.@\n..') {
//     console.log('Attack Test passed')
//   }
//   else { console.log('Attack Test failed') }
// };
//
// testHitShip(2, [0, 1, 0, 0], 2, 1);
