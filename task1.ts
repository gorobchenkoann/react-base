type CalcFuncType = (a: number, b: number) => number;
type ScaleType = 2 | 10 | 16;
type CalcFuncNonDecimalType = (a: string, b: string, scale?: ScaleType) => string;

let add: CalcFuncType = (a, b) => (a + b);
let subtsracte: CalcFuncType = (a, b) => a - b;
let multiplicate: CalcFuncType = (a, b) => a * b;
let divide: CalcFuncType = (a, b) => a / b;

let addNonDec: CalcFuncNonDecimalType = (a, b, scale = 2) => {
    let res = parseInt(a, scale) + parseInt(b, scale);
    return res.toString(scale);
};
let subtracteNonDec: CalcFuncNonDecimalType = (a, b, scale = 2) => {
    let res = parseInt(a, scale) - parseInt(b, scale);
    return res.toString(scale);
};
let multiplicateNonDec: CalcFuncNonDecimalType = (a, b, scale = 2) => {
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
console.log(`a: ${a} - b: ${b} = ${subtsracte(a, b)}`);
console.log(`a: ${a} * b: ${b} = ${multiplicate(a, b)}`);
console.log(`a: ${a} / b: ${b} = ${divide(a, b)}`);

//Binary
let aBin = '1100100'; //100
let bBin = '10010'; //18
console.info('Binary:');
console.log(`a + b = ${aBin} + ${bBin} = ${addNonDec(aBin, bBin, 2)}`);
console.log(`a - b = ${aBin} - ${bBin} = ${subtracteNonDec(aBin, bBin, 2)}`);
console.log(`a * b = ${aBin} * ${bBin} = ${multiplicateNonDec(aBin, bBin, 2)}`);
console.log(`a / b = ${aBin} / ${bBin} = ${divideNonDec(aBin, bBin, 2)}`);

//Hex
let aHex = '3E8'; //1000
let bHex = '1F4'; //500
console.info('Hex:');
console.log(`a + b = ${aHex} + ${bHex} = ${addNonDec(aHex, bHex, 16)}`);
console.log(`a - b = ${aHex} - ${bHex} = ${subtracteNonDec(aHex, bHex, 16)}`);
console.log(`a * b = ${aHex} * ${bHex} = ${multiplicateNonDec(aHex, bHex, 16)}`);
console.log(`a / b = ${aHex} / ${bHex} = ${divideNonDec(aHex, bHex, 16)}`);