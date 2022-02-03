// write your code here
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const MINUS_FOUR = -4;
const FIVE = 5;

// 1)
const getMaxEvenElement = (arr) => {
  return arr.reduce((acc, value) => {
    return value % TWO === 0 && value > acc ? value : acc
  }, 0)
}

// console.log(getMaxEvenElement([1, 2, 3, 4, 5]));

// 2)
let a = THREE;
let b = FIVE;

[a, b] = [b, a]

// 3)
const getValue = (value) => {
  return value ?? '-'
}

// console.log(getValue(undefined))

// 4)
const arrayOfArrays = [
  ['name', 'dan'],
  ['age', '21'],
  ['city', 'lviv']
]

const getObjFromArray = (arr) => {
  const entries = new Map(arr);
  return Object.fromEntries(entries)
}

// console.log(getObjFromArray(arrayOfArrays));

// 5)
const obj1 = {name: 'nick'};

const addUniqueId = (idObj) => {
  return {...idObj, id: Symbol()}
}

// console.log(addUniqueId(obj1));
// console.log(Object.keys(obj1).includes('id'));

// 6)
const oldObj = {
  name: 'willow',
  details: { id: 1, age: 47, university: 'LNU' }
}

const getRegroupedObject = (obj) => {
  const regroupedObj = {};
  return {...regroupedObj, university: obj.details.university,
    user: {
      age: obj.details.age,
      firstName: obj.name,
      id: obj.details.id }
  }
}

// console.log(getRegroupedObject(oldObj))

// 7)
const arr = [TWO, THREE, FOUR, TWO, FOUR, 'a', 'c', 'a'];

const getArrayWithUniqueElements = (arr) => {
  return [...new Set(arr)]
}

// console.log(getArrayWithUniqueElements(arr))

// 8)
const phoneNumber = '0123456789';

const hideNumber = (number) => {
  const last4Digits = number.slice(MINUS_FOUR);
  return last4Digits.padStart(number.length, '*')
}

// console.log(hideNumber(phoneNumber))

// 9)
function paramsRequired() {
    throw new Error('b is required')
}

function add(a, b = paramsRequired()) {
  if (arguments.length < TWO) {
    return b
  } else {
    return a + b
  }
}

// console.log(add(2))

// 10)
function* generateIterableSequence() {
  yield 'I';
  yield 'love';
  yield 'JS';
}

const generatorObject = generateIterableSequence();
for (let value of generatorObject) {
  console.log(value)
}