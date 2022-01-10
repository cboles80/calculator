const version = "0.0.7";
const elVersion = document.querySelector('.version');
console.log('Hello World ' + version);
elVersion.innerHTML = version;

const elKeys = document.querySelectorAll('.keyboard-frame div');
const elDisplay = document.querySelector('.display .live');
const elRunning = document.querySelector('.display .running');
const arValidInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
'/', 'x', '-', '+', 'Clr', '='];
let inputBuffer = '';
let liveOperator;

function calculate(inputBuffer){
    console.log('equals');
    let arInputs = inputBuffer.split(' ');
    console.log(arInputs);
    let operation = arInputs[1];
    console.log(operation);
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
    console.log(liveOperator);
    let accumulator;

    if (e.type === 'keyup'){
        myValue = e.key;
    } else{
        console.log('else');
        myValue = e.target.innerHTML;
    }
    console.log('myvalue 59', myValue);
    console.log(liveOperator);
    let idx = arValidInputs.indexOf(myValue);
    console.log('idx', idx);
    //Check if input is valid
    if(idx === -1){
        return; //<============== EARLY RETURN
    }else if(idx <= 11){ // ***(0-9,.)***
        inputBuffer += myValue;
        elDisplay.innerText = inputBuffer;
        console.log('SHOULD BE A NUMBER');
        if(liveOperator !== '0'){
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
        inputBuffer += ' ' + myValue + ' ';
        if(liveOperator !== '0'){
            accumulator = calculate(inputBuffer);
            console.log('accumulator', accumulator);
        }
        liveOperator = idx;
        console.log('liveOperator', liveOperator);
        elDisplay.innerText = inputBuffer;
    }
    
    myValue = Array.of(myValue);
    console.log(myValue);
}

// ON PAGE LOAD

elKeys.forEach(key => {
    key.addEventListener('click', handleUserInput);
})

document.addEventListener('keyup', handleUserInput);