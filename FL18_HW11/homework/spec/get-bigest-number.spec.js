// Your code goes here
const getBiggestNumber = require('../src/get-bigest-number');

describe('Biggy', () => {
  it('Returns the biggest value', () => {
    //arrange
    const numbers = [1, 2, 4, 5, 1, 14, 6, 5, 7]

    //act
    const result = getBiggestNumber(...numbers)

    //assert
    expect(result).toBe(14)
  })

  it('Should accept numbers as arguments', () => {
    // arrange
    const someArrWithBoolean = [1, 3, 5, 2, true, 1, 22, 11]

    //assert
    expect(() => getBiggestNumber(...someArrWithBoolean)).toThrow(new Error('Wrong argument type'))
  })

  it('Should accept more 2 arguments', () => {
    // arrange
    const oneArg = 2;

    expect(() => getBiggestNumber(oneArg)).toThrow(new Error('Not enough arguments'))
  })

  it('Should accept less than 10 arguments', () => {
    // arrange
    const moreThanTenArgsArr = [1, 2, 5, 2, 12, 42, 12, 42, 11, 23, 41, 22];

    //assert
    expect(() => getBiggestNumber(...moreThanTenArgsArr)).toThrow(new Error('Too many arguments'))
  })
})