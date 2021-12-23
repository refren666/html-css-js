/* START TASK 1: Your code goes here */
const tableCells = document.getElementsByTagName('td');
const tableRows = document.getElementsByTagName('tr');

const cellsCollection = document.getElementsByClassName('cell');
const specialCell = document.getElementsByClassName('special')[0];

const cellsArray = Array.from(cellsCollection);
cellsArray.forEach((cell) => {
    cell.addEventListener('click', (e) => {
        const clickedCellClassCollection = e.target.classList;
        clickedCellClassCollection.toggle('yellow-bg');
    })
})

specialCell.addEventListener('click', () => {
    for (let cell of tableCells) {
        cell.classList.toggle('green-bg')
    }
})

for (let i = 0; i < tableRows.length; i++) {
    let row = tableRows[i];
    let cell = tableRows[i].firstElementChild;
    cell.addEventListener('click', () => {
        for (let rowCells of row.children) {
            rowCells.classList.toggle('blue-bg');
        }
    })
}
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const form = document.forms.phoneForm;
const messagePlaceholder = document.getElementById('messagePlaceholder');
const inputField = document.getElementById('phone-input');
const sendBtn = document.getElementById('sendBtn');
const successMsg = document.createElement('div');
successMsg.classList.add('successMsg');
successMsg.innerText = 'Data was successfully sent';
const warningMsg = document.createElement('div');
warningMsg.classList.add('warningMsg');
warningMsg.innerText = 'Type number does now follow format +380*********';

const validPhoneNumber = /^\+380\d{9}$/
sendBtn.disabled = true;

inputField.addEventListener('input', () => {
    if (inputField.value.match(validPhoneNumber)) {
        warningMsg.style.display = 'none';
        sendBtn.disabled = false;
    } else if(!inputField.value.length) {
        warningMsg.style.display = 'none';
        successMsg.style.display = 'none';
    } else {
        warningMsg.style.display = 'block';
        successMsg.style.display = 'none';
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.style.display = 'block';
    warningMsg.style.display = 'none';
})

messagePlaceholder.append(successMsg, warningMsg);
/* END TASK 2 */

/* START TASK 3: Your code goes here */
let teamAScores = 0;
let teamBScores = 0;
const TEN = 10;
const ONE_SECOND = 1000;
const THREE_SECONDS = 3000;

const field = document.getElementById('gameWrapper');
const ball = document.getElementById('ball');
const teamABasket = document.getElementById('teamABasket');
const teamBBasket = document.getElementById('teamBBasket');
const teamAScoreboard = document.getElementById('teamAScoreboard');
teamAScoreboard.innerText = `Team A: ${teamAScores}`;
const teamBScoreboard = document.getElementById('teamBScoreboard');
teamBScoreboard.innerText = `Team B: ${teamBScores}`;
const notificationBlock = document.getElementById('notificationBlock');

field.addEventListener('click', function (e) {
    // координати поля щодо вікна браузера
    let fieldCoords = this.getBoundingClientRect();

    // м'яч має абсолютне позиціонування (position:absolute), поле - відносне (position:relative)
    // таким чином, координати м'яча розраховуються щодо внутрішнього, верхнього лівого кута поля.
    let ballCoords = {
        top: e.clientY - fieldCoords.top - field.clientTop - ball.clientHeight / TEN,
        left: e.clientX - fieldCoords.left - field.clientLeft - ball.clientWidth / TEN
    };
    // забороняємо перетинати верхню межу поля
    if (ballCoords.top < 0) {
        ballCoords.top = 0;
    }
    // забороняємо перетинати ліву межу поля
    if (ballCoords.left < 0) {
        ballCoords.left = 0;
    }
    // забороняємо перетинати правий кордон поля
    if (ballCoords.left + ball.clientWidth > field.clientWidth) {
        ballCoords.left = field.clientWidth - ball.clientWidth;
    }
    // забороняємо перетинати нижню межу поля
    if (ballCoords.top + ball.clientHeight > field.clientHeight) {
        ballCoords.top = field.clientHeight - ball.clientHeight;
    }
    ball.style.left = ballCoords.left + 'px';
    ball.style.top = ballCoords.top + 'px';
})

const timeouts = () => {
    setTimeout(() => {
        ball.style.top = '50%';
        ball.style.left = '50%';
    }, ONE_SECOND)
    setTimeout(() => {
        notificationBlock.innerText = '';
    }, THREE_SECONDS)
}

teamABasket.addEventListener('click', () => {
    teamBScores++;
    teamBScoreboard.innerText = `Team B: ${teamBScores}`;
    notificationBlock.style.color = 'red';
    notificationBlock.innerText = 'Team B Scores!'
    timeouts();
})

teamBBasket.addEventListener('click', () => {
    teamAScores++;
    teamAScoreboard.innerText = `Team A: ${teamAScores}`;
    notificationBlock.style.color = 'blue';
    notificationBlock.innerText = 'Team A Scores!'
    timeouts();
})
/* END TASK 3 */