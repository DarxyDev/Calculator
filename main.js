//const types
const OPR = 'operation';
const NUM = 'number';
// const values
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
//initialization
const ref = getCalcReferences();
setButtonEvents();
function getCalcReferences() {
    let obj = {};
    obj.screen = document.getElementById('screen');
    for (let i = 0; i < 10; i++) {
        obj[i] = document.getElementById('num' + i);
    }
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
    ref.decimal.addEventListener('click',()=>doAction(OPR,DECIMAL));
    ref.negative.addEventListener('click', () => doAction(OPR, NEGATIVE));
    ref.equals.addEventListener('click', () => doAction(OPR, EQUALS));
    ref.clear.addEventListener('click', () => doAction(OPR, CLEAR));
    ref.mPlus.addEventListener('click', () => doAction(OPR, M_PLUS));
    ref.mMinus.addEventListener('click', () => doAction(OPR, M_MINUS));
    ref.mR.addEventListener('click', () => doAction(OPR, M_RECALL));
    ref.mC.addEventListener('click', () => doAction(OPR, M_CLEAR));
}
//main
function doAction(type, value) {
    console.log(`${type} || ${value}`);
}

