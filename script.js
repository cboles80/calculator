const version = "0.0.2";
const elVersion = document.querySelector('.version');
console.log('Hello World ' + version);
elVersion.innerHTML = version;

const elKeys = document.querySelectorAll('.keyboard-frame div');
const elDisplay = document.querySelector('.display')


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
    elDisplay.innerText = myValue;
}

// ON PAGE LOAD

elKeys.forEach(key => {
    key.addEventListener('click', handleUserInput);
})

document.addEventListener('keyup', handleUserInput);