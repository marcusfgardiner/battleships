let battleshipGrid = (n, array) => {
  let outputArray = []
  outputArray = buildGrid(n, array, outputArray);
  return outputArray
}

let buildGrid = (n, array, outputArray) => {
  array.map(function(element, i) {
    outputArray.push(dotsStars(element));
    if (isNewGridLine(i, n, array))
      { outputArray.push('\n') }
  });
  return outputArray.join('')
}

let isNewGridLine = (i, n, array) => {
  return ((i+1) % n === 0 && ((i+1) < array.length))
};

let dotsStars = element => {
  if ( element === 0 ) {
    return '.'
  }
  else {
    return '*'
  }
};

let isShip = (grid, x, y) => {
  grid_array = grid.split('\n')
  row = grid_array[(y-1)]
  row_array = row.split('')
  space = row_array[(x-1)]
  if (space === '*'){
    return true
  };
};

let attack = (grid, x, y) => {
  if( isShip(grid, x, y) )
    { updated_grid = console.log(grid) }
    return updated_grid
};

let testGrid = (n, array) => {
  let output = battleshipGrid(n, array)
  console.log(output)
  if (output === '.*\n..') {
    console.log('Grid','Test passed')
  }
  else { console.log('Grid','Test failed') }
};

testGrid(2, [0, 1, 0, 0]);

let testHitShip = (n, array, x, y) => {
  let output = battleshipGrid(n, array)
  let hitOutput = attack(output, x, y)
  if (output === '.@\n..') {
    console.log('Attack Test passed')
  }
  else { console.log('Attack Test failed') }
};

testHitShip(2, [0, 1, 0, 0], 2, 1);
