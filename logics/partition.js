const partition = (myString) => {
const result = [];

const isPalindrome = (str) => {
let left = 0;
let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) {
        return false; 
    }
left++;
right--;
}
return true; 
}
const lastPartition = (start, path) => {
    if (start === myString.length) {
    result.push([...path]); 
    return;
}
for (let end = start; end < myString.length; end++) {
    const substring = myString.substring(start, end + 1);
        if (isPalindrome(substring)) {
            path.push(substring); 
            lastPartition(end + 1, path); 
            path.pop(); 
        }
    }
}
lastPartition(0, []);
return result;
}

const myString = "aab";
console.log(partition(myString));
