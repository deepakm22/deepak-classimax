let num1 = [1,2,2,3,3];
let num2 = [5,7,9,8,9];
let finalArray = [...num1, ...num2]; 
console.log(finalArray);

for (let i = 0; i < finalArray.length - 1; i++) {
    for (let j = 0; j < finalArray.length - 1 - i; j++) {
        if (finalArray[j] > finalArray[j + 1]) {
        let temp = finalArray[j];
        finalArray[j] = finalArray[j + 1];
        finalArray[j + 1] = temp;
        }
    }
}
console.log("Sorted Array:", finalArray);

let n = finalArray.length; 
let median;
if (n % 2 === 1) {
    median = finalArray[(n +1) / 2]; 
    finalMedian = median -1
    console.log(median);
} else {
    median = (finalArray[n / 2 - 1] + finalArray[n / 2]) / 2;
    console.log(median);
}
