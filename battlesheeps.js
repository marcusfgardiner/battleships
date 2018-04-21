var BattleshipGrid = (n, array) => {
  this.outputString = ''
  this.outputString = buildOutputString(n, array, outputString);
}

BattleshipGrid.prototype.buildOutputString = (n, array, outputString) => {
  array.map(function(element, i) {
    outputString += this.dotsStars(element);
    if (this.isNewGridLine(i, n, array))
      { this.outputString += '\n' }
  });
}

BattleshipGrid.prototype.isNewGridLine = (i, n, array) => {
  return ((i+1) % n === 0 && ((i+1) < array.length))
};

BattleshipGrid.prototype.dotsStars = element => {
  if ( element === 0 ) {
    return '.'
  }
  else {
    return '*'
  }
}

let test = (n, array) => {
  let output = battleshipGrid(n, array)
  console.log(output)
  if (output === '.*\n.*') {
    console.log('Test passed')
  }
  else { console.log('Test failed') }
};

test(3, [0, 1, 0, 1,0,0,0,1,0]);
