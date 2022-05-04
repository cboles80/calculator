const version = "0.0.95";
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
let lastNumberInput;

function updateCalculationPrecision(pValue) {
    console.log(liveOperator);
    const myOperator = arValidInputs[liveOperator];
    pValue.toString();
    console.log("updateCalculationPrecision pValue is: ", pValue);
    
    if (pValue.includes('.') === true) {
        const decimal = pValue.indexOf('.');
        console.log("decimal = " , decimal);
        const decNumber = pValue.slice(decimal + 1);
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
    console.log('top calculate');
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

    console.log('precision is: ', precision);

    console.log('calculate', myAnswer);
    console.log(typeof myAnswer);

    // myAnswer.toFixed(precision);
    myAnswer = (Math.round(myAnswer * 100) / 100).toFixed(precision);
    console.log('calculate after mult * 100 is: ', myAnswer);
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

    if (e.type === 'keyup') {
        myValue = e.key;
    } else {
        myValue = e.target.innerHTML;
    }

    let idx =  arValidInputs.indexOf(myValue);

    //Check if input is valid
    if (idx === -1) {
        return; //<============== EARLY RETURN

    } else if (idx <= 10) { // ***(0-9,.)***
        inputBuffer += myValue;
        elDisplay.innerText = inputBuffer;
    
        if (liveOperator === 0) {
            accumulator = inputBuffer;
        } else {
            if (idx !== 10) {
                let arTemp  = inputBuffer.split(' ');
                lastNumberInput = arTemp[2];
            }
            accumulator = calculate(inputBuffer);
        }

    } else if (idx === arValidInputs.length - 1) { // ***(=)***
        console.log('ucp= ');
        updateCalculationPrecision(lastNumberInput);
        accumulator = calculate(inputBuffer);

        inputBuffer += ' = ' + accumulator;
        
        elDisplay.innerText = inputBuffer;
        elRunning.innerText = accumulator;
        //precision = 0;

    } else if (idx === arValidInputs.length - 2) {
        clearCalc();

    } else { // ***(/, x, -, +)***
        let theValue = inputBuffer;
        if (liveOperator === 0) {
            inputBuffer += ' ' + myValue + ' ';
            // accumulator = inputBuffer;
        } else {
            inputBuffer = accumulator + ' ' + myValue + ' ';
            theValue = inputBuffer
            if (inputBuffer.trim().slice(-1) === myValue) {
                const arTemp = inputBuffer.split(' ');
                theValue = arTemp[0];
            }
            
            // accumulator = calculate(inputBuffer);
        }
        liveOperator = idx;
        //Store the precision of the calculation
        console.log('ucp + -');
        updateCalculationPrecision(theValue); // <======================== 
        elDisplay.innerText = inputBuffer;
    }

    myValue = Array.of(myValue);
}

// ON PAGE LOAD

elKeys.forEach(key => {
    key.addEventListener('click', handleUserInput);
})

document.addEventListener('keyup', handleUserInput);