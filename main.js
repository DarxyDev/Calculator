//const types
const OPR_B = 'operation_binary';
const OPR_U = 'operation_unary'
const NUM = 'number';
const FUN = 'function';
// const values
//const names
const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = 'x';
const DIVIDE = '/';
const DECIMAL = '.';
const NEGATIVE = 'negative';
const EQUALS = '=';
const CLEAR = 'clear';
const M_PLUS = 'mPlus';
const M_MINUS = 'mMinus';
const M_CLEAR = 'mC';
const M_RECALL = 'mR';
//globals
var equation = {
    num1:0,
    num2: null,
    opr: null
}
//initialization
const ref = getCalcReferences();
setButtonEvents();
function getCalcReferences() {
    let obj = {};
    for (let i = 0; i < 10; i++) {
        obj[i] = document.getElementById('num' + i);
    }
    obj.displayTop = document.getElementById('display-top');
    obj.displayBottom = document.getElementById('display-bottom');
    obj.decimal = document.getElementById('decimal');
    obj.add = document.getElementById('add');
    obj.subtract = document.getElementById('subtract');
    obj.multiply = document.getElementById('multiply');
    obj.divide = document.getElementById('divide');
    obj.negative = document.getElementById('negative');
    obj.equals = document.getElementById('equals');
    obj.clear = document.getElementById('clear');
    obj.mPlus = document.getElementById('mPlus');
    obj.mMinus = document.getElementById('mMinus');
    obj.mR = document.getElementById('mR');
    obj.mC = document.getElementById('mC');
    return obj;
}
function setButtonEvents() {
    for (let i = 0; i < 10; i++) ref[i].addEventListener('click', () => { doAction(NUM, i.toString()) });
    ref.add.addEventListener('click', () => doAction(OPR_B, ADD));
    ref.subtract.addEventListener('click', () => doAction(OPR_B, SUBTRACT));
    ref.multiply.addEventListener('click', () => doAction(OPR_B, MULTIPLY));
    ref.divide.addEventListener('click', () => doAction(OPR_B, DIVIDE));
    ref.decimal.addEventListener('click', () => doAction(NUM, DECIMAL));
    ref.negative.addEventListener('click', () => doAction(OPR_U, NEGATIVE));
    ref.equals.addEventListener('click', () => doAction(FUN, EQUALS));
    ref.clear.addEventListener('click', () => doAction(FUN, CLEAR));
    ref.mPlus.addEventListener('click', () => doAction(FUN, M_PLUS));
    ref.mMinus.addEventListener('click', () => doAction(FUN, M_MINUS));
    ref.mR.addEventListener('click', () => doAction(FUN, M_RECALL));
    ref.mC.addEventListener('click', () => doAction(FUN, M_CLEAR));
}
//main
function doAction(type, val) {
    switch (type) {
        case NUM:
            numInput(val);
            break;
        case OPR_U:
            break;
        case OPR_B:
            break;
        case FUN:
            break;
        default:
            console.log(`doAction Error: unexpected type '${type}'`);
    }
}
//input
function numInput(input){
    let txt = getLowerText();
    if(txt.includes('.') && input === DECIMAL) return;
    if(txt === '0' && input !== DECIMAL) txt = '';
    txt += input;
    setLowerText(txt);
}
//common functions
function setLowerText(str){
    ref.displayBottom.innerText = str;
}
function getLowerText(){
    return ref.displayBottom.innerText;
}
function setUpperText(str){
    ref.displayBottom.innerText = str;
}
function getUpperText(){
    return ref.displayBottom.innerText;
}
function setMessageText(str){
    console.log(`Message text box not yet implemented.. '${str}' not displayed.`);
}