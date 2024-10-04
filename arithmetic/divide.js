function division(num1, num2) {
    let stepString = '';
    let currentDividend = String(num1); 
    let currentRemainder = 0;          
    let result = '';                     

    for (let i = 0; i < currentDividend.length; i++) {
        currentRemainder = currentRemainder * 10 + parseInt(currentDividend[i]);
    
        let quotient = Math.floor(currentRemainder / num2); 
        let remainder = currentRemainder % num2; 

        result += quotient; 

        stepString += `   ${currentRemainder} `;

        currentRemainder = remainder; 
    }


    return stepString; 
}


division(1234, 5);
