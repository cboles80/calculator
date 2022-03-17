const version = "0.0.92";
const elVersion = document.querySelector('.version');
console.log('Hello World ' + version);
elVersion.innerHTML = version;

const elKeys = document.querySelectorAll('.keyboard-frame div');
const elDisplay = document.querySelector('.display .live');
const elRunning = document.querySelector('.display .running');
const arValidInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
  '/', 'x', '-', '+', 'Clr', '='
];
let inputBuffer = '';
let liveOperator = 0;
let accumulator;
let precision = 0;

function updateCalculationPrecision(ibvalue) {
  console.log('top updateCalculationPrecision', liveOperator);
  const myOperator = arValidInputs[liveOperator];
  ibvalue.toString();
  console.log("updateCalculationPrecision", ibvalue);

  if (ibvalue.includes('.') === true) {
    const decimal = ibvalue.indexOf('.');
    console.log(decimal);
    const decNumber = ibvalue.slice(decimal + 1);
    console.log("decNumber = " + decNumber);
    console.log(decNumber.toString().length);
    let myPrecision = decNumber.toString().length;
    switch (myOperator) {
      case "+":
      case "-":
        console.log("+");
        if (myPrecision > precision) {
          precision = myPrecision;
        }
        console.log(precision, myPrecision);
        break;

      case "*":
      case "/":
        precision += myPrecision;
        break;
    }
    // return decNumber.toString().length;
  } else {
    console.log('Doesn\'t include a decimal');
    // return 0;
  }

}

function calculate(inputBuffer) {
  console.log('top calculate');
  console.log('input buffer is: ', inputBuffer);

  let arInputs = inputBuffer.split(' ');
  console.log(arInputs);
  let operation = arInputs[1];
  let myAnswer;

  switch (operation) {
    case '+':
      console.log('+');
      console.log('element 0', parseFloat(arInputs[0]));
      console.log('element 2', parseFloat(arInputs[2]));
      myAnswer = parseFloat(arInputs[0]) + parseFloat(arInputs[2]);
      break;
    case '-':
      myAnswer = arInputs[0] - arInputs[2];
      break;
    case 'x':
      myAnswer = arInputs[0] * arInputs[2];
      break;
    case '/':
      myAnswer = arInputs[0] / arInputs[2];
      break;
  }
  console.log('precision is: ', precision);
  console.log('myAnswer is: ', myAnswer);
  console.log(typeof myAnswer);

  myAnswer.toFixed(precision);
  console.log('toFixed is: ', myAnswer);
  myAnswer = (Math.round(myAnswer * 100) / 100).toFixed(precision);
  console.log('Math is: ', myAnswer);
  return myAnswer;
}

function clearCalc() {
  accumulator = null;
  inputBuffer = '';
  liveOperator = 0;
  precision = 0;
  elDisplay.innerText = inputBuffer;
  elRunning.innerText = accumulator;
  return;
}

function handleUserInput(e) {
  let myValue;
  console.log('top handleUserInput - liveoperator is: ', liveOperator);

  if (e.type === 'keyup') {
    myValue = e.key;
  } else {
    myValue = e.target.innerHTML;
  }
  console.log('myValue is: ', myValue);

  console.log('after reading e - liveoperator is: ', liveOperator);
  let idx = arValidInputs.indexOf(myValue);
  console.log('idx is: ', idx);

  //Check if input is valid
  if (idx === -1) {
    return; //<============== EARLY RETURN
  }

  if (idx <= 10) { // ***(0-9,.)***
    console.log('idx is <= 10: ', idx);
    inputBuffer += myValue;
    elDisplay.innerText = inputBuffer;
    console.log('SHOULD BE A NUMBER or a "."');
    if (liveOperator === 0) {
      accumulator = inputBuffer;
      console.info('if accumulator is: ', accumulator);
    } else {
      if (idx < 10) {
        accumulator = calculate(inputBuffer);
        console.log('else accumulator is: ', accumulator);
      }
    }

  } else if (idx === arValidInputs.length - 1) { // ***(=)***
    console.log('idx is === arValidInputs.length - 1 ', idx);
    // updateCalculationPrecision(inputBuffer);
    updateCalculationPrecision(myValue);
    accumulator = calculate(inputBuffer);
    inputBuffer += ' = ' + accumulator;
    elDisplay.innerText = inputBuffer;
    elRunning.innerText = accumulator;
    console.log('equals');
    precision = 0;

  } else if (idx === arValidInputs.length - 2) {
    console.log('idx is === arValidInputs.length - 2 ', idx);
    clearCalc();

  } else { // ***(/, x, -, +)***
    console.log('we have a math operator');
    let theValue = inputBuffer;
    if (liveOperator === 0) {
      inputBuffer += ' ' + myValue + ' ';
      console.warn('liveOperator = 0');
      // accumulator = inputBuffer;
    } else {
      inputBuffer = accumulator + ' ' + myValue + ' ';
      console.log('lo != 0', inputBuffer);
      // accumulator = calculate(inputBuffer);
      console.log('accumulator', accumulator);
    }
    liveOperator = idx;
    //Store the precision of the calculation
    updateCalculationPrecision(theValue);
    console.log("precision = " + precision);
    console.log('liveOperator', liveOperator);
    console.log('accumulator', accumulator);
    elDisplay.innerText = inputBuffer;
  }

  myValue = Array.of(myValue);
  console.log('myValue arr', myValue);
}

function handleNumber(pThisValue) {


}

function handleUserInput_new(e) {
  let myValue;
  console.log('top handleUserInput_new - liveoperator is: ', liveOperator);

  if (e.type === 'keyup') {
    myValue = e.key;
  } else {
    myValue = e.target.innerHTML;
  }
  console.log('myValue is: ', myValue);

  console.log('after reading e - liveoperator is: ', liveOperator);
  let idx = arValidInputs.indexOf(myValue);
  console.log('idx is: ', idx);

  //Check if input is valid or clear(Clr).
  if (idx === -1) {
    return; //<============== EARLY RETURN
  }

  if (idx === arValidInputs.length - 2) {
    console.log('we have a Clr, calling clearCalc');
    // clearCalc reinitializes the following:
    // inputBuffer = '';
    // liveOperator = 0;
    // accumulator = null;
    // precision = 0;
    clearCalc();
  }

  // Handle numbers, decimal point, or operators.
  if (idx <= 10) { // ***(0-9,.)***
    console.log('we have a number or decimal');
    inputBuffer += myValue

  } else {
    // It must be either a "+, -, *, /, or ="
    if (liveOperator !== 0) {


    }
  }

}

// ON PAGE LOAD

elKeys.forEach(key => {
  key.addEventListener('click', handleUserInput);
})

document.addEventListener('keyup', handleUserInput);