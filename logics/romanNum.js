let romanNum = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
};

let input = "IXCD"
let output = 0

for(let i=0; i < input.length; i++){
    output = output + romanNum[input[i]]
}

console.log(output)