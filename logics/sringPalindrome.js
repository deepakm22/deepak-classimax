const longestPalindrome = (str) => {
    let result = [];
    for (let i = 0; i < str.length; i++) {
    let newString = ""; 
    for (let j = i; j < str.length; j++) {
        newString += str[j]; 
        result.push(newString); 
    }  
}

return result;
}
let myInput = "babad";
console.log(longestPalindrome(myInput));



