//const types
const OPR = 'operation';
const NUM = 'number';
const FUN = 'function';
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
function numInput(newVal) {
    let preVal = '0';
    if (lastInput.type !== OPR) preVal = ref.displayBottom.innerText;
    let valid = true;
    switch (true) {
        case newVal === DECIMAL:
            if (!preVal.includes('.')) preVal += '.';
            else valid = false;
            break;
        case newVal === NEGATIVE:
            if (+preVal > 0) preVal = '-' + preVal;
            else if (+preVal < 0) preVal = preVal.slice(1, preVal.length);
            else valid = false;
            break;
        case preVal === '0':
            preVal = newVal;
            break;
        default:
            preVal += newVal;
    }
    if (valid) {
        ref.displayBottom.innerText = preVal;
        lastInput.type = NUM;
        lastInput.val = preVal;
        if (equation.opr == null) equation.num1 = +preVal;
        else equation.num2 = +preVal;
    }
}
function oprInput(val) {
    console.log(`${val} pressed.`);
    lastInput.val = val;
    if (lastInput.type === NUM) {
        lastInput.type = OPR;
        equals();
    }
    else lastInput.type = OPR;
    equation.opr = val;
    ref.displayTop.innerText = `${equation.num1} ${equation.opr}`;
}
function funInput(val) {
    console.log(`${val} pressed.`);
    lastInput.type = FUN;
    lastInput.val = val;
    switch (val) {
        case EQUALS:
            equals();
            break;
        case CLEAR:
            clear();
            break;
        case M_PLUS:
            break;
        case M_MINUS:
            break;
        case M_RECALL:
            break;
        case M_CLEAR:
            break;
        default:
            console.log(`funInput Error: Unexpected value '${val}'`);
    }
}
function equals() {
    if (equation.num2 === null || equation.opr === null) return;
    let result = 0;
    switch (equation.opr) {
        case ADD:
            result = equation.num1 + equation.num2;
            break;
        case SUBTRACT:
            result = equation.num1 - equation.num2;
            break;
        case MULTIPLY:
            result = equation.num1 * equation.num2;
            break;
        case DIVIDE:
            if (equation.num2 === 0) {
                console.log('dividing by 0');
                clear();
                ref.displayBottom.innerText = 'CAN NOT DIVIDE BY 0';
                return;
            }
            else result = equation.num1 / equation.num2;
            console.log('dividing');
            break;
        default: console.log(`equals Error: Unexpected value '${equation.opr}'`);
    }
    ref.displayTop.innerText = `${equation.num1} ${equation.opr} ${equation.num2} =`;
    ref.displayBottom.innerText = result;
    equation.num1 = result;
}
function clear() {
    equation = {
        opr: null,
        num1: 0,
        num2: null
    }
    lastInput = {
        type: NUM,
        val: '0'
    }
    ref.displayBottom.innerText = '0';
    ref.displayTop.innerText = '';
}
