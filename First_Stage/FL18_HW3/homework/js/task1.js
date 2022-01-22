// Your code goes here
const initialSum = +prompt('Sum');
const years = +prompt('Years');
const yearPercentage = +prompt('Percentage');

const minimumDeposit = 1000;
const hundredPercent = 100;
const two = 2;
const year = 1;
const zero = 0;


if (typeof initialSum !== 'number' || typeof years !== 'number' || typeof yearPercentage !== 'number') {
    alert('Invalid input data');
} else if (initialSum < minimumDeposit || years < year || yearPercentage > hundredPercent) {
    alert('Invalid input data');
} else {
    countProfit(initialSum, years, yearPercentage);
}

function countProfit(sum, years, percentPerYear) {
    let profit = zero;
    let totalProfit = zero;
    for (let i = 0; i < years; i++) {
        profit = sum * percentPerYear / hundredPercent; // 100 , 110 , 121...
        sum+=profit;
        totalProfit+=profit;
    }

    alert('Initial amount: ' + initialSum + '\n' +
    'Number of years: ' + years + '\n' +
    'Percentage of years: ' + percentPerYear + '\n' +
    'Total profit: ' + totalProfit.toFixed(two) + '\n' +
    'Total amount: ' + sum.toFixed(two));
}
