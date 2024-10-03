function multiplication({ number1, number2 }) {
    let answer = number1 * number2; 
    let intermediateSteps = []; 

    const num1Str = number1.toString();
    const num2Str = number2.toString();

    for (let i = num2Str.length - 1; i >= 0; i--) {
        const digit2 = parseInt(num2Str[i]);
        let partialResult = 0; 
        let currentPlaceValue = 1; 

        let currentStep = '';

        for (let j = num1Str.length - 1; j >= 0; j--) {
            const digit1 = parseInt(num1Str[j]);
            const product = digit1 * digit2;
            partialResult += product * currentPlaceValue; 

            currentStep = `${digit1} * ${digit2} = ${product} ` + currentStep ;
            currentPlaceValue *= 10; 
        }

        intermediateSteps.push(partialResult); 
    }

    const formattedIntermediateSteps = intermediateSteps.join(' ');

    return {
        answer: answer,
        intermediateSteps: formattedIntermediateSteps 
    };
}

console.log(multiplication({number1: 12, number2: 12}));
