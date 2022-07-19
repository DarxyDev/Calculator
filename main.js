//const types
const OPR = 'operation';
const NUM = 'number';
const FUN = 'function';
// const values
const DIGIT_LIMIT = 13;
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
var lastInput = {
    type: NUM,
    val: '0'
}
var equation = {
    opr: null,
    num1: 0,
    num2: null
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
    for (let i = 0; i < 10; i++) ref[i].addEventListener('click', () => { doAction(NUM, i) });
    ref.add.addEventListener('click', () => doAction(OPR, ADD));
    ref.subtract.addEventListener('click', () => doAction(OPR, SUBTRACT));
    ref.multiply.addEventListener('click', () => doAction(OPR, MULTIPLY));
    ref.divide.addEventListener('click', () => doAction(OPR, DIVIDE));
    ref.decimal.addEventListener('click', () => doAction(NUM, DECIMAL));
    ref.negative.addEventListener('click', () => doAction(NUM, NEGATIVE));
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
        case OPR:
            oprInput(val);
            break;
        case FUN:
            funInput(val);

            break;
        default:
            console.log(`doAction Error: unexpected type '${type}'`);
    }
}