const version = "0.0.5";
const elVersion = document.querySelector('.version');
console.log('Hello World ' + version);
elVersion.innerHTML = version;

const elKeys = document.querySelectorAll('.keyboard-frame div');
const elDisplay = document.querySelector('.display')
const arValidInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
'/', 'x', '-', '+', '='];
let inputBuffer = '';

function calculate(inputBuffer){
    console.log('equals');
    let arInputs = inputBuffer.split(' ');
    console.log(arInputs);
    let operation = arInputs[1];
    console.log(operation);
    let myAnswer;
    if (operation === "+"){
        myAnswer = parseInt(arInputs[0]) + parseInt(arInputs[2]);
    }
    return " = " + myAnswer;
}

function clearCalc(){
    inputBuffer = '';
    myValue = '';
    elDisplay.innerText = inputBuffer;
    return;
}

function handleUserInput(e) {
    console.log('user input');
    console.log(e);
    console.log(e.type);
    let myValue;
    if (e.type === 'keyup'){
        myValue = e.key;
    } else{
        console.log('else');
        myValue = e.target.innerHTML;
    }
    console.log(myValue);
    let idx = arValidInputs.indexOf(myValue);
    console.log(idx);
    //Check if input is valid
    if(myValue === 'Clr'){
        clearCalc()
    }
    if(idx === -1){
        return; //<============== EARLY RETURN
    }else if(idx <= 9){ // ***(0-9)***
        inputBuffer += myValue;
        elDisplay.innerText = inputBuffer;
        console.log('SHOULD BE A NUMBER');
    }else if(idx === arValidInputs.length - 1){ // ***(=)***
        inputBuffer += calculate(inputBuffer);
        elDisplay.innerText = inputBuffer;
        console.log('equals');
    }else { // ***(/, x, -, +)***
        inputBuffer += ' ' + myValue + ' ';
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