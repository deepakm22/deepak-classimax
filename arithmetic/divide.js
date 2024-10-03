function division({ number1, number2 }) {
    // Handle division by zero
    if (number2 === 0) {
        throw new Error("Cannot divide by zero");
    }

    const answer = Math.floor(number1 / number2); // Calculate the quotient
    let currentRemainder = 0; // Initialize current remainder
    let intermediateSteps = []; // Array to hold intermediate results

    const num1Str = number1.toString();
    
    // Iterate through each digit in number1
    for (let i = 0; i < num1Str.length; i++) {
        // Update current remainder by bringing down the next digit
        currentRemainder = currentRemainder * 10 + parseInt(num1Str[i]);
        
        // Calculate the quotient digit for this step
        let quotientDigit = Math.floor(currentRemainder / number2);
        intermediateSteps.push(quotientDigit); // Store the quotient digit
        
        // Update the current remainder after division
        currentRemainder %= number2;
        
        // Include the current remainder in the steps as well
        intermediateSteps.push(currentRemainder);
    }

    const formattedIntermediateSteps = intermediateSteps.join(' '); // Join steps with a space

    return {
        answer: answer,
        intermediateSteps: formattedIntermediateSteps 
    };
}

console.log(division({ number1: 12, number2: 2 }));






