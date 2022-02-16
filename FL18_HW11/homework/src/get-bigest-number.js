// Your code goes here
function getBiggestNumber() {
  const TWO = 2;
  const TEN = 10;
  const argsArr = Array.from(arguments)
  if (arguments.length < TWO) {
    throw new Error('Not enough arguments')
  } else if (arguments.length > TEN) {
    throw new Error('Too many arguments')
  } else if (argsArr.filter(argument => typeof argument !== 'number').length > 0) {
    throw new Error('Wrong argument type')
  }
  return Math.max(...arguments)
}

module.exports = getBiggestNumber;