let battleshipGrid = (n, array) => {
  let outputString = ''
  outputString = buildOutputString(n, array, outputString);
  return outputString
}

let buildOutputString = (n, array, outputString) => {
  array.map(function(element, i) {
    outputString += dotsStars(element);
    if (isNewGridLine(i, n, array))
      { outputString += '\n' }
  });
  return outputString
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
}

let test = (n, array) => {
  let output = battleshipGrid(n, array)
  console.log(output)
  if (output === '.*\n.*') {
    console.log('Test passed')
  }
  else { console.log('Test failed') }
};

test(2, [0, 1, 0, 1]);
