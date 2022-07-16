//const types
const OPR = 'operation';
const NUM = 'number';
// const values
const ADD = 'add';
const SUBTRACT = 'subtract';
const MULTIPLY = 'multiply';
const DIVIDE = 'divide';
const NEGATIVE = 'negative';
const EQUALS = 'equals';
const M_PLUS = 'mPlus';
const M_MINUS = 'mMinus';
const M_CLEAR = 'mC';
const M_RECALL = 'mR';
//initialization
const ref = getCalcReferences();
function getCalcReferences(){
    let obj = {};
    obj.screen = document.getElementById('screen');
    for(let i = 0; i < 10; i++){
        obj[i] = document.getElementById('num'+i);
    }
    obj.add = document.getElementById('add');
    obj.subtract = document.getElementById('subtract');
    obj.multiply = document.getElementById('multiply');
    obj.divide = document.getElementById('divide');
    obj.equals = document.getElementById('equals');
    obj.clear = document.getElementById('clear');
    obj.negative = document.getElementById('negative');
    obj.clear = document.getElementById('clear');
    obj.mPlus = document.getElementById('mPlus');
    obj.mMinus = document.getElementById('mMinus');
    obj.mR = document.getElementById('mR');
    obj.mC = document.getElementById('mC');
    return obj;
}
//main
function doAction(type, value){
    if(!type) return;
    if(!value) return;
}

