const largestSum = (array) => {
let maxSum = 0;           
let currentSum = 0;       
let currentElements = []; 
let maxElements = [];     

for (let i = 0; i < array.length; i++) {  
if (array[i] < 0) {                  
    currentSum += array[i];           
    currentElements.push(array[i]);  
    console.log(currentElements);
    
} else
{                            
if (currentSum < maxSum) {      
    maxSum = currentSum;        
    maxElements = currentElements;  
}
    currentSum = 0;                 
    currentElements = [];           
}
}if (currentSum < maxSum) {
        maxSum = currentSum;
        maxElements = currentElements;
    }

console.log (maxSum);
console.log( maxElements);
}

const array = [-2, 7, -5, -1, 3, -2, 9, -7];
largestSum(array);


