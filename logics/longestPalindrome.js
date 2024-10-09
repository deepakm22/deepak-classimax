const longestPalindrome = (str) => {
    let result = [];

const isPalindrome = (s) => {
    let start = 0;
    let end = start.length - 1;

while (start < end) {
    if (s[start] !== s[end]) {
        return false; 
    }
    start++;
    end--;
    }
    return true; 
};

for (let i = 0; i < str.length; i++) {
    let newString = ""; 
    for (let j = i; j < str.length; j++) {
        newString += str[j]; 
        result.push(newString); 
        if (isPalindrome(newString) && newString.length > result.length) {
            result = newString;  
        }
    }  
}

return result;
}
let example = "babad";
console.log(longestPalindrome(example));


