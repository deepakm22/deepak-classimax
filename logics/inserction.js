
const intersection = (num1, num2) => {
    const result = [];

    for (let i = 0; i < num1.length; i++) {
        let j = 0;
        while (j < num2.length) {
            if (num1[i] === num2[j]) {
                result.push(num1[i]);
                break; 
            }
            j++;
        }
    }

    return result;
};

const num1 = [1, 2, 2, 4];
const num2 = [2, 4, 3, 5, 6, 7];

console.log(intersection(num1, num2));
