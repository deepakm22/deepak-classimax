function add({ num1, num2 }) {
    let answer = num1 + num2;
    let intermediateSteps = [];
    let carry = 0;
    
    const num1Str = num1.toString().split('').reverse();
    const num2Str = num2.toString().split('').reverse();

    const maxLength = Math.max(num1Str.length, num2Str.length);

    for (let i = 0; i < maxLength; i++) {
        const digit1 = parseInt(num1Str[i] || 0, 10);
        const digit2 = parseInt(num2Str[i] || 0, 10);

        let sum = digit1 + digit2 + carry;
        carry = Math.floor(sum / 10);
        const currentStep = `(Add ${digit1} + ${digit2} + ${carry > 0 ? 'carry ' + carry : 'no carry'} )`;
        intermediateSteps.push(currentStep);
    }
    if (carry > 0) {
        intermediateSteps.push(`Final carry = ${carry}`);
    }

    return { answer, intermediateSteps };
}


