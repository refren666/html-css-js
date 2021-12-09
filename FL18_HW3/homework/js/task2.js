// Your code goes here
const number0 = 0;
const number1 = 1;
const number2 = 2;
const number9 = 9;
const number13 = 13;
const multiplier = 2;
const firstPrize = 100;
const secondPrize = 50;
const thirdPrize = 25;
let totalPrize = 0;
let number3 = 3;

const starter = confirm('Do you want to play a game?');


function letsRoll(count = number3) {
    let randomNumber = Math.floor(Math.random() * number9);
    if (!starter) {
        alert('You did not become a billionaire, but can.');
    } else {
        const userNumber = +prompt('Enter number from 0 to 8' + '\n' +
            'Attempts left: ' + count + '\n' +
            'Total prize ' + totalPrize);
        if (userNumber === randomNumber && count === number3) {
            totalPrize += firstPrize;
            const firstAnswer = confirm(`Congrats! You have won ${firstPrize}$!. Do you want to continue?`)
            if (firstAnswer) {
                secondGame(number3);
            } else {
                alert('Your total prize is ' + totalPrize + '$');
                gameRepeat()
            }
        } else if (userNumber === randomNumber && count === number2) {
            totalPrize += secondPrize;
            const secondAnswer = confirm(`Congrats! You have won ${secondPrize}$!. Do you want to continue?`)
            if (secondAnswer) {
                secondGame(number3);
            } else {
                alert('Your total prize is ' + totalPrize + '$');
                gameRepeat()
            }
        } else if (userNumber === randomNumber && count === number1) {
            totalPrize += thirdPrize;
            const thirdAnswer = confirm(`Congrats! You have won ${thirdPrize}$!. Do you want to continue?`)
            if (thirdAnswer) {
                secondGame(number3);
            } else {
                alert('Your total prize is ' + totalPrize + '$');
                gameRepeat()
            }
        } else if (count === number0) {
            alert('Thank you for your participation. Your prize is:' + totalPrize + '$');
            gameRepeat();
        } else {
            count--;
            letsRoll(count);
        }
    }
}

function gameRepeat() {
    const playAgain = confirm('Do you want to play again?');
    if (playAgain) {
        letsRoll(number3)
    } else {
        alert('You did not become a billionaire, but can.');
    }
}

function secondGame(count) {
    let randomNumber = Math.floor(Math.random() * number13);
    const userNumberNew = +prompt('Enter number from 0 to 12' + '\n' +
        'Attempts left: ' + count + '\n' +
        'Total prize ' + totalPrize + '\n');
    if (userNumberNew === randomNumber && count === number3) {
        totalPrize += firstPrize * multiplier;
        alert(`Congrats. You have won: ${firstPrize * multiplier}$!
        Your current balance: ${totalPrize}$!`);
        gameRepeat();
    } else if (userNumberNew === randomNumber && count === number2) {
        totalPrize += secondPrize * multiplier;
        alert(`Congrats. You have won: ${secondPrize * multiplier}$!
        Your current balance: ${totalPrize}$`);
        gameRepeat();
    } else if (userNumberNew === randomNumber && count === number1) {
        totalPrize += thirdPrize * multiplier;
        alert(`Congrats. You have won: ${thirdPrize * multiplier}$!
        Your current balance: ${totalPrize}$`);
        gameRepeat();
    } else if (count === number0) {
        alert('Thank you for your participation. Your prize is:' + totalPrize + '$');
        gameRepeat();
    } else {
        count--;
        secondGame(count);
    }
}

letsRoll();