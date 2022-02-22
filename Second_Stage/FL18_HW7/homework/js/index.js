$(document).ready(function () {
  let firstNumber;
  let secondNumber;
  let operator;
  let result;
  let isOperatorChosen; //global variable to see if the operator has been chosen or not
  let currentNumber = 0;
  $('input').val(currentNumber);

  const initializeCalculator = function () {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    currentNumber = 0;
    isOperatorChosen = false;
    $('#first-number, #second-number, #operator, #result').empty();
  }

  $('.number').on('click', function () {
    currentNumber = this.value;
    $('input').css('color', 'black').val(currentNumber);
    if (isOperatorChosen) {
      secondNumber = this.value;
    } else {
      firstNumber = this.value;
    }

  });

  $('.operator').on('click', function () {
    isOperatorChosen = true;
    operator = this.value;

  });

  $('.equal').on('click', function () {
    firstNumber = parseInt(firstNumber, 10);
    secondNumber = parseInt(secondNumber, 10);

    if (operator === '/' && secondNumber === 0) {
      $('input').css('color', 'red').val('ERROR');
      return
    }

    switch (operator) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
      default:
        throw new Error('Invalid operator');
    }

    $('.log__container').prepend(`
      <div class='log__item'>
        <span class='circle' onclick={$(this).toggleClass('red')}>&#9711;</span>
        <span class='equation'>${firstNumber} ${operator} ${secondNumber} = ${result}</span>
        <span class='cross' onclick={$(this).closest('.log__item').remove()}>&times;</span>
      </div>
    `)

    $('input').val(result);
  });

  $('.clear').on('click', function () {
    initializeCalculator();
    $('input').css('color', 'black').val(currentNumber);
  });

  initializeCalculator();
});