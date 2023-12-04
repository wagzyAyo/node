const fs = require('fs');
const { encode } = require('punycode');
const readline = require('readline');

let textin = fs.readFileSync('./files/info.txt','utf-8');
console.log(textin)

let content = `Data read from input file: ${textin}. \n date created ${new Date()}`
fs.writeFileSync('./files/output.txt', content);