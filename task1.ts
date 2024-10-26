type CalcFuncType = (a: number, b: number) => number;
type ScaleType = 2 | 16;
type CalcFuncNonDecimalType = (a: string, b: string, scale?: ScaleType) => string;

let add: CalcFuncType = (a, b) => (a + b);
let subtract: CalcFuncType = (a, b) => a - b;
let multiply: CalcFuncType = (a, b) => a * b;
let divide: CalcFuncType = (a, b) => a / b;

let addNonDec: CalcFuncNonDecimalType = (a, b, scale = 2) => {
    let res = parseInt(a, scale) + parseInt(b, scale);
    return res.toString(scale);
};
let subtractNonDec: CalcFuncNonDecimalType = (a, b, scale = 2) => {
    let res = parseInt(a, scale) - parseInt(b, scale);
    return res.toString(scale);
};
let multiplyNonDec: CalcFuncNonDecimalType = (a, b, scale = 2) => {
    let res = parseInt(a, scale) * parseInt(b, scale);
    return res.toString(scale);
};
let divideNonDec: CalcFuncNonDecimalType = (a, b, scale = 2) => {
    let res = parseInt(a, scale) / parseInt(b, scale);
    return res.toString(scale);
};

//Decimal
let a = 8;
let b = 3;
console.info('Decimal:');
console.log(`a: ${a} + b: ${b} = ${add(a, b)}`);
console.log(`a: ${a} - b: ${b} = ${subtract(a, b)}`);
console.log(`a: ${a} * b: ${b} = ${multiply(a, b)}`);
console.log(`a: ${a} / b: ${b} = ${divide(a, b)}`);

//Binary
let aBin = '1100100'; //100
let bBin = '10010'; //18
console.info('Binary:');
console.log(`a + b = ${aBin} + ${bBin} = ${addNonDec(aBin, bBin, 2)}`);
console.log(`a - b = ${aBin} - ${bBin} = ${subtractNonDec(aBin, bBin, 2)}`);
console.log(`a * b = ${aBin} * ${bBin} = ${multiplyNonDec(aBin, bBin, 2)}`);
console.log(`a / b = ${aBin} / ${bBin} = ${divideNonDec(aBin, bBin, 2)}`);

//Hex
let aHex = '3E8'; //1000
let bHex = '1F4'; //500
console.info('Hex:');
console.log(`a + b = ${aHex} + ${bHex} = ${addNonDec(aHex, bHex, 16)}`);
console.log(`a - b = ${aHex} - ${bHex} = ${subtractNonDec(aHex, bHex, 16)}`);
console.log(`a * b = ${aHex} * ${bHex} = ${multiplyNonDec(aHex, bHex, 16)}`);
console.log(`a / b = ${aHex} / ${bHex} = ${divideNonDec(aHex, bHex, 16)}`);