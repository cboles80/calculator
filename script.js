const version = "0.0.91";
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
    console.log(liveOperator);
    const myOperator = arValidInputs[liveOperator];
    ibvalue.toString();
    console.log("updateCalculationPrecision", ibvalue);
    if (ibvalue.includes('.') === true) {
        const decimal = ibvalue.indexOf('.');
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
        console.log('Doesnt include a decimal');
        // return 0;
    }

}

function calculate(inputBuffer) {
    let arInputs = inputBuffer.split(' ');
    let operation = arInputs[1];
    let myAnswer;
    switch (operation) {
        case '+':
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
    console.log(precision);
    console.log(myAnswer);
    console.log(typeof myAnswer);
    myAnswer.toFixed(precision);
    console.log(myAnswer);
    return myAnswer;
}

function clearCalc() {
    inputBuffer = '';
    myValue = '';
    elDisplay.innerText = inputBuffer;
    liveOperator = 0;
    accumulator = null;
    elRunning.innerText = accumulator;
    precision = 0;
    return;
}

function handleUserInput(e) {
    let myValue;
    console.log('liveoperator:', liveOperator);

    if (e.type === 'keyup') {
        myValue = e.key;
        console.log(myValue);
    } else {
        console.log('else');
        myValue = e.target.innerHTML;
        console.log(myValue);
    }
    console.log('myValue is: ', myValue);
    console.log(liveOperator);
    let idx = arValidInputs.indexOf(myValue);
    console.log('idx:', idx);
    //Check if input is valid
    if (idx === -1) {
        return; //<============== EARLY RETURN

    } else if (idx <= 10) { // ***(0-9,.)***
        inputBuffer += myValue;
        elDisplay.innerText = inputBuffer;
        console.log('SHOULD BE A NUMBER');
        if (liveOperator === 0) {
            accumulator = inputBuffer;
            console.info(accumulator);
        } else {
            accumulator = calculate(inputBuffer);
            console.log('accumulator', accumulator);
        }
    } else if (idx === arValidInputs.length - 1) { // ***(=)***
        updateCalculationPrecision(inputBuffer);
        accumulator = calculate(inputBuffer);
        inputBuffer += ' = ' + accumulator;
        elDisplay.innerText = inputBuffer;
        elRunning.innerText = accumulator;
        console.log('equals');
        precision = 0;
    } else if (idx === arValidInputs.length - 2) {
        clearCalc();
    } else { // ***(/, x, -, +)***
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
        elDisplay.innerText = inputBuffer;
    }

    myValue = Array.of(myValue);
    console.log('myValue arr', myValue);
}

// ON PAGE LOAD

elKeys.forEach(key => {
    key.addEventListener('click', handleUserInput);
})

document.addEventListener('keyup', handleUserInput);