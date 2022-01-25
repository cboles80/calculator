const version = "0.0.8";
const elVersion = document.querySelector('.version');
console.log('Hello World ' + version);
elVersion.innerHTML = version;

const elKeys = document.querySelectorAll('.keyboard-frame div');
const elDisplay = document.querySelector('.display .live');
const elRunning = document.querySelector('.display .running');
const arValidInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
'/', 'x', '-', '+', 'Clr', '='];
let inputBuffer = '';
let liveOperator = 0;
let accumulator;

function calculate(inputBuffer){
    console.log('calculate function');
    let arInputs = inputBuffer.split(' ');
    console.log(arInputs);
    let operation = arInputs[1];
    console.log('--->',operation);
    let myAnswer;
    switch(operation) {
        case '+':
            myAnswer = parseInt(arInputs[0]) + parseInt(arInputs[2]);
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
    return myAnswer;
}

function clearCalc(){
    inputBuffer = '';
    myValue = '';
    elDisplay.innerText = inputBuffer;
    liveOperator = 0;
    accumulator = null;
    return;
}

function handleUserInput(e) {
    console.log('user input');
    console.log(e);
    console.log(e.type);
    let myValue;
    console.log('operator',liveOperator);

    if (e.type === 'keyup'){
        myValue = e.key;
        console.log(myValue);
    } else{
        console.log('else');
        myValue = e.target.innerHTML;
        console.log(myValue);
    }
    console.log('myValue is: ', myValue);
    console.log(liveOperator);
    let idx = arValidInputs.indexOf(myValue);
    console.log('idx', idx);
    //Check if input is valid
    if(idx === -1){
        return; //<============== EARLY RETURN
    }else if(idx <= 10){ // ***(0-9,.)***
        inputBuffer += myValue;
        elDisplay.innerText = inputBuffer;
        console.log('SHOULD BE A NUMBER');
        if(liveOperator === 0){
            accumulator = inputBuffer;
        }else{
            accumulator = calculate(inputBuffer);
            console.log('accumulator', accumulator);
        }
    }else if(idx === arValidInputs.length - 1){ // ***(=)***
        accumulator = calculate(inputBuffer);
        inputBuffer += ' = ' + accumulator;
        elDisplay.innerText = inputBuffer;
        elRunning.innerText = accumulator;
        console.log('equals');
    }else if (idx === arValidInputs.length -2){
        clearCalc();
    }else { // ***(/, x, -, +)***
        if(liveOperator === 0){
            inputBuffer += ' ' + myValue + ' ';
            // accumulator = inputBuffer;
        }else{
            inputBuffer = accumulator + ' ' + myValue;
            console.log('lo != 0',inputBuffer);
            // accumulator = calculate(inputBuffer);
            console.log('accumulator', accumulator);
        }
        liveOperator = idx;
        console.log('liveOperator', liveOperator);
        elDisplay.innerText = inputBuffer;
    }
    
    myValue = Array.of(myValue);
    console.log('myValue arr',myValue);
}

// ON PAGE LOAD

elKeys.forEach(key => {
    key.addEventListener('click', handleUserInput);
})

document.addEventListener('keyup', handleUserInput);