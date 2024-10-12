function Subtraction({num1, num2}) {
    let answer = num1 - num2;
    let stepString = '';
    let regroup = 0;

    const strNum1 = String(num1).split('').reverse();
    const strNum2 = String(num2).split('').reverse();
    
    const maxLength = Math.max(strNum1.length, strNum2.length);    
    
    for (let i = 0; i < maxLength; i++) { 
        let digit1 = parseInt(strNum1[i] || 0, 10);
        let digit2 = parseInt(strNum2[i] || 0, 10); 

        digit1 -= regroup;         

        if (digit1 < digit2) {
            digit1 += 10;
            regroup = 1;
        } else {
            regroup = 0;
        }

        let diff = digit1 - digit2;        
        stepString = ` ${digit1} - ${digit2} (regroup: ${regroup}) = ${diff}` + stepString;
        // console.log(stepString);
        
    }

    return { answer, stepString };
}







// function largestSumarray(arr) {
//     let maxSum = 0;           
//     let currentSum = 0;       
//     let currentElements = []; 
//     let maxElements = [];     

//     for (let i = 0; i < arr.length; i++) {  
//         if (arr[i] >= 0) {                  
//             currentSum += arr[i];           
//             currentElements.push(arr[i]);   
//         } else {                            
//             if (currentSum > maxSum) {      
//                 maxSum = currentSum;        
//                 maxElements = [...currentElements];  
//             }
//             currentSum = 0;                 
//             currentElements = [];           
//         }
//     }

//     if (currentSum > maxSum) {
//         maxSum = currentSum;
//         maxElements = [...currentElements];
//     }

//     console.log("Sum:", maxSum);
//     console.log("Elements:", maxElements.join(", "));
// }

// const arr = [-2, 7, 5, -1, 3, 2, 9, -7];
// largestSumarray(arr);
