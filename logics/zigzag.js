const zigzag = (str) => {
    let result = []; 
    let row1 = []; 
    let row2 = []; 

for (let i = 0; i < str.length; i++) {
    if (i % 2 == 0) {
        row1.push(str[i]); 
    } else {
        row2.push(str[i]); 
    }
}

result = [row1, row2];
    for(let i=0; i < result.length; i++){
        colum = " "
    for(let j= 0; j < result[i].length; j++){
        colum += result[i][j]
    }
console.log(colum);

}

return result; 
}

const res = zigzag("Deepak");
console.log(res);

