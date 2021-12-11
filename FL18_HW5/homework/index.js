// Your code goes here
const number2 = 2;
const number3 = 3;
const number5 = 5;

const isEqual = (num1, num2) => num1 === num2;
isEqual(number5, number5);

const isBigger = (num1, num2) => num1 > num2;
isBigger(number5, number2);

const storeNames = (...names) => names;
storeNames('Olka', 'Polka', 'Marko', 'Pedro','Karlo');

const getDifference = (num1, num2) => {
    if (num1 < num2) {
        return num2 - num1;
    } else {
        return num1 - num2;
    }
}

getDifference(number2, number5);

const negativeCount = arr => arr.filter(negNum => negNum < 0).length
negativeCount([number5, number2, number5]);

const letterCount = (string, letter) => string.split('').filter(el => el === letter).length;
letterCount('Marry', 'r');

//Eslint dislikes eval function...

/*const countPoints = arr => {
    let counter = 0;
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        str += arr[i] + (i < arr.length - 1 ? ' ' : '')
    }
    const newArray = str.replaceAll(':', '/').split(' ').map(eval);
    for (const result of newArray) {
        if (result > 1) {
            counter += number3;
        } else if (result === 1) {
            counter++;
        }
    }
    return counter;
}*/

const countPoints = arr => {
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        let result = arr[i].split(':');
        if (+result[0] > +result[1]) {
            counter += number3;
        } else if (+result[0] === +result[1]) {
            counter++;
        }
    }
    return counter;
}

countPoints(['100:90', '110:98', '100:100', '95:46', '54:90', '99:44', '90:90', '111:100']);
