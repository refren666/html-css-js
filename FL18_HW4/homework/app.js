function reverseNumber(num) {
    const numToString = num + '';
    const numArr = numToString.split('');
    let str = '';
    for (let i = numArr.length - 1; i >= 0; i--) {
        str += numArr[i]
    }
    return parseFloat(str) * Math.sign(num); // Math.sign adds minus to negative number!
}

// console.log(reverseNumber(12345));
// console.log(reverseNumber(-56789));

// let array = [2, 5, 8];

function forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}

// forEach(array, function(el) { console.log(el) });

function map(arr, func) {
    forEach(arr, func);
}

// map([2, 5, 8], function(el) { console.log(el + 3) });
// map([1, 2, 3, 4, 5], function(el) { console.log(el * 2) });

function filter(arr, func) {
    forEach(arr, func);
}

// filter([2, 5, 1, 3, 8, 6], function(el) {
//     if (el > 3) {
//         console.log(el);
//     }
// })
//
// filter([1, 4, 6, 7, 8, 10], function(el) {
//     if (el % 2 === 0) {
//         console.log(el);
//     }
// })

// let peoples = [
//     {
//         "_id": "5b5e3168c6bf40f2c1235cd6",
//         "index": 0,
//         "age": 39,
//         "eyeColor": "green",
//         "name": "Stein",
//         "favoriteFruit": "apple"
//     },
//     {
//         "_id": "5b5e3168e328c0d72e4f27d8",
//         "index": 1,
//         "age": 38,
//         "eyeColor": "blue",
//         "name": "Cortez",
//         "favoriteFruit": "strawberry"
//     },
//     {
//         "_id": "5b5e3168cc79132b631c666a",
//         "index": 2,
//         "age": 2,
//         "eyeColor": "blue",
//         "name": "Suzette",
//         "favoriteFruit": "apple"
//     },
//     {
//         "_id": "5b5e31682093adcc6cd0dde5",
//         "index": 3,
//         "age": 17,
//         "eyeColor": "green",
//         "name": "Weiss",
//         "favoriteFruit": "banana"
//     }
// ]

const eighteen = 18;

function getAdultAppleLovers(data) {
    map(data, function (el) {
        if (el.age > eighteen && el.favoriteFruit === 'apple') {
            console.log(el.name);
        }
    })
}

// getAdultAppleLovers(peoples);

const two = 2;
const three = 3;

function getKeys(obj) {
    const keysArray = [];
    for (let key in obj) {
        keysArray.push(key);
    }
    return keysArray;
}

// console.log(getKeys({keyOne: 1, keyTwo: two, keyThree: three}));

function getValues(obj) {
    const valuesArray = [];
    for (let key in obj) {
        valuesArray.push(obj[key]);
    }
    return valuesArray;
}

// console.log(getValues({keyOne: 1, keyTwo: two, keyThree: three}));


function showFormattedDate(dateObj) {
    const dateValues = dateObj.toDateString();
    const dateValuesArray = dateValues.split(' ');
    console.log(`It is ${dateValuesArray[two]} of ${dateValuesArray[1]}, ${dateValuesArray[three]}`)
}

// showFormattedDate(new Date('2018-12-27T01:10:00'));
