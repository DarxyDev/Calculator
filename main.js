//const types
const OPR_B = 'operation_binary';
const OPR_U = 'operation_unary'
const NUM = 'number';
const FUN = 'function';
// const values
const MAX_DIGITS = 13;
//const names
const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = 'x';
const DIVIDE = '/';
const DECIMAL = '.';
const NEGATIVE = 'negative';
const BACKSPACE = 'backspace';
const EQUALS = '=';
const CLEAR = 'clear';
const M_PLUS = 'mPlus';
const M_MINUS = 'mMinus';
const M_CLEAR = 'mC';
const M_RECALL = 'mR';
//globals
var equation = {
    num1: 0,
    num2: null,
    opr: null,
    lastAction: null
}
var mem1 = 0;
var usingNum1 = true;
//initialization
const ref = getCalcReferences();
setButtonEvents();
document.addEventListener('keydown', handleKeyInput);

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
    obj.backspace = document.getElementById('backspace');
    obj.equals = document.getElementById('equals');
    obj.clear = document.getElementById('clear');
    obj.mPlus = document.getElementById('mPlus');
    obj.mMinus = document.getElementById('mMinus');
    obj.mR = document.getElementById('mR');
    obj.mC = document.getElementById('mC');
    return obj;
}
function setButtonEvents() {
    for (let i = 0; i < 10; i++) ref[i].addEventListener('click', () => { handleInput(NUM, i.toString()) });
    ref.add.addEventListener('click', () => handleInput(OPR_B, ADD));
    ref.subtract.addEventListener('click', () => handleInput(OPR_B, SUBTRACT));
    ref.multiply.addEventListener('click', () => handleInput(OPR_B, MULTIPLY));
    ref.divide.addEventListener('click', () => handleInput(OPR_B, DIVIDE));
    ref.negative.addEventListener('click', () => handleInput(OPR_U, NEGATIVE));
    ref.decimal.addEventListener('click', () => handleInput(NUM, DECIMAL));
    ref.backspace.addEventListener('click', () => handleInput(NUM, BACKSPACE));
    ref.equals.addEventListener('click', () => handleInput(FUN, EQUALS));
    ref.clear.addEventListener('click', () => handleInput(FUN, CLEAR));
    ref.mPlus.addEventListener('click', () => handleInput(FUN, M_PLUS));
    ref.mMinus.addEventListener('click', () => handleInput(FUN, M_MINUS));
    ref.mR.addEventListener('click', () => handleInput(FUN, M_RECALL));
    ref.mC.addEventListener('click', () => handleInput(FUN, M_CLEAR));
}
function handleKeyInput(e) {
    let key = e.key;
    if (Number.isInteger(+key)) {
        ref[key].click();
        return;
    }
    switch (key) {
        case '.': ref.decimal.click();
            break;
        case 'n':
            ref.negative.click();
            break;
        case '+':
            ref.add.click();
            break;
        case '-':
            ref.subtract.click();
            break;
        case 'x':
        case '*':
            ref.multiply.click();
            break;
        case '/':
            ref.divide.click();
            break;
        case 'Backspace':
            ref.backspace.click();
            break;
        case '=':
        case 'Enter':
            ref.equals.click();
            break;
        case 'c':
            ref.clear.click();
            break;
        default: console.log(`Unrecognized key: '${key}'`);
    }
}
//main
function handleInput(type, val) {
    switch (type) {
        case NUM:
            numInput(val);
            break;
        case OPR_U:
            unaryOprInput(val);
            break;
        case OPR_B:
            binaryOprInput(val);
            break;
        case FUN:
            funInput(val);
            break;
        default:
            console.log(`handleInput Error: unexpected value '${type}'`);
    }
    //if (val !== M_CLEAR && val !== M_PLUS && val !== M_MINUS) equation.lastAction = val;
}
//input
function numInput(input) {
    let txt;
    if (equation.lastAction === EQUALS) clear();
    if (equation.opr === null) txt = equation.num1;
    else txt = equation.num2;
    if (txt !== null) txt = txt.toString();
    else txt = '';
    let isDecimal = txt.includes('.');
    let maxLength = MAX_DIGITS;
    if (isDecimal) maxLength++;
    if (isDecimal && input === DECIMAL) return;
    if (txt === '0' && input !== DECIMAL) txt = '';
    if (input !== BACKSPACE) txt += input;
    else {
        if (txt.length > 0) txt = txt.slice(0, txt.length - 1);
    }
    if (equation.opr === null) {
        usingNum1 = true;
        equation.num1 = txt;
    }
    else {
        usingNum1 = false;
        equation.num2 = txt;
    }
    setLowerText(txt);
    equation.lastAction = input;
}

function unaryOprInput(opr) {
    switch (opr) {
        case NEGATIVE:
            if (usingNum1) {
                equation.num1 *= -1;
                setLowerText(equation.num1);
            }
            else {
                equation.num2 *= -1;
                setLowerText(equation.num2);
            }
            break;
        default:
            console.log(`unaryOprInput Error: unexpected value '${opr}'`);
    }
}
function binaryOprInput(opr) {
    if (isEquationValid()) {
        equals(true);
        equation.num2 = null;
    }
    equation.opr = opr;
    setUpperText(`${equation.num1} ${opr}`);
    usingNum1 = false;
    equation.lastAction = opr;
}
function funInput(fun) {
    switch (fun) {
        case EQUALS:
            equals();
            break;
        case CLEAR:
            clear();
            break;
        case M_CLEAR:

            console.log('clear');
            mem1 = 0;
            break;
        case M_RECALL:
            if (equation.lastAction === EQUALS) clear();
            if (equation.opr === null) {
                usingNum1 = true;
                equation.num1 = mem1;
            }
            else {
                usingNum1 = false;
                equation.num2 = mem1;
            }
            setLowerText(mem1);
            console.log('recall');
            break;
        case M_PLUS:
            if (equation.opr === null || equation.num2 === null || equation.lastAction === EQUALS) mem1 += +equation.num1;
            else mem1 += +equation.num2;
            console.log('plus');
            break;
        case M_MINUS:
            if (equation.opr === null || equation.num2 === null || equation.lastAction === EQUALS) mem1 -= +equation.num1;
            else mem1 -= +equation.num2;
            console.log('minus');
            break;

        default:
            console.log(`binaryOprInput Error: unexpected value '${fun}'`);
    }
    console.log(mem1);
}
function equals(fromOperator = false) {
    if (!isEquationValid()) return;
    if (equation.lastAction === EQUALS && fromOperator) return;
    let num1 = +equation.num1;
    let num2 = +equation.num2;
    let opr = equation.opr;
    let result = null;
    switch (opr) {
        case MULTIPLY:
            result = num1 * num2;
            break;
        case DIVIDE:
            if (num1 !== 0 && num2 !== 0)
                result = num1 / num2;
            break;
        case ADD:
            result = num1 + num2;
            break;
        case SUBTRACT:
            result = num1 - num2;
            break;
        default:
            console.log(`equals Error: unexpected operator '${opr}'`);
    }
    if (result === null) return;
    setUpperText(`${num1} ${opr} ${num2} =`);
    equation.num1 = result;
    setLowerText(result);
    usingNum1 = true;
    equation.lastAction = EQUALS;
}
function clear() {
    equation.num1 = 0;
    equation.num2 = null;
    equation.opr = null;
    equation.lastAction = null;
    setUpperText('');
    setLowerText('0');
}
//common functions
function isEquationValid() {
    for (arr of Object.entries(equation)) {
        if (arr[1] === null) {
            console.log(arr[0] + ` is null.`);
            return false;
        }
    }
    return true;
}
function setLowerText(str) {
    str = formatStr(str);
    ref.displayBottom.innerText = str;
}
function getLowerText() {
    console.log('get');
    return ref.displayBottom.innerText;
}
function setUpperText(str) {
    str = formatStr(str);
    ref.displayTop.innerText = str;
}
function getUpperText() {
    return ref.displayBottom.innerText;
}
function setMessageText(str) {
    console.log(`Message text box not yet implemented.. '${str}' not displayed.`);
}
//adds commas to numbers for better visual formatting
function formatStr(str) {
    if (typeof (str) !== typeof ('')) str = str.toString();
    let numArr = getWholeNumbers(str);
    if (numArr.length <= 0) return str; //if no numbers present, return original string
    numArr = addParenthesis(numArr);
    let newStr = str.slice(0, numArr[0].start);
    for (let i = 0; i < numArr.length; i++) {
        newStr += numArr[i].num;
        if ((i + 1) < numArr.length) {
            newStr += str.slice(numArr[i].end, numArr[i + 1].start);
        }
        else {
            newStr += str.slice(numArr[i].end, str.length);
        }
    }
    return newStr;


    function addParenthesis(objArr = [{ num: '' }]) {
        objArr.forEach((obj) => {
            let num = obj.num;
            if (num.length > 3) {
                for (let i = num.length - 3; i > 0; i -= 3) {
                    num = num.slice(0, i) + ',' + num.slice(i, num.length);
                }
            }
            obj.num = num;
        })
        return objArr;
    }

    function getWholeNumbers(str = '', initialIndex = 0, objArr = []) {
        if (initialIndex >= str.length) return objArr;
        let startIndex = null;
        let endIndex = null;
        let i = initialIndex
        for (i = i; i < str.length; i++) {
            if (Number.isInteger(+str[i]) && str[i] !== ' ') {
                if (startIndex === null) startIndex = i;
            } else {
                if (startIndex !== null) {
                    endIndex = i;
                    i++;
                    break;
                }
            }
        }
        if (startIndex !== null && endIndex === null) endIndex = i;
        if (startIndex > 0 && str[startIndex - 1] === '.') return getWholeNumbers(str, i, objArr);
        if (startIndex !== null && endIndex !== null) {
            objArr.push({
                start: startIndex,
                end: endIndex,
                num: str.slice(startIndex, endIndex)
            });
        }
        return getWholeNumbers(str, i, objArr);
    }
}
function floatToRational(num){
    if(Number.isNaN(+num)){
        console.log(`floatToRational error: '${num}' is not a number.`);
        return NaN;
    }
    num = num.toString();
    let decIndex = num.indexOf('.');
    if(decIndex < 0) decIndex = num.length;
    let rational = {
        w: +num.slice(0,decIndex) ,
        n: +num.slice(decIndex + 1, num.length),
        d: 0
    }
    if(decIndex < num.length) rational.d = Math.pow(10, num.length - decIndex - 1);
    return rational;
}
function rationalToFloat(rat){
    if(rat.d === 0) return rat.w;
    let w = rat.w.toString();
    let n = rat.n.toString();
    let d = rat.d.toString();
    let z = '';
    let decPlaces = d.length - 1;
    for( ; decPlaces > n.length; decPlaces--){
        z = '0' + z;
    }
    return +(w + '.' + z + n);
}
console.log('implement rationals');
