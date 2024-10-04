// let input = [0, 0, 2, 0, 3, 12];
// let count = 0;

// for (let i = 0; i < input.length; i++) {
// if (input[i] != 0) {
//     input[count++] = input[i];    
// }
//     if (i >= count) {
//     input[i] = 0; 
// }
// }

// /*  for (let i = count; i < input.length; i++) {
//      input[i] = 0;
// }  */





// let input = [0, 0, 2, 0, 3, 12];
// let count = 0;

// for (let i = 0; i < input.length; i++) {
//     if (input[i] != 0) {
//     input[count++] = input[i];    
//     }
//     if (i >= count) {
//     input[i] = 0; 
// }
// }

// /*  for (let i = count; i < input.length; i++) {
//    input[i] = 0;
// }  */




// let input = [2, 7, 6, 3, 11, 15];
// let target = 9;

// for (let i = 0; i < input.length; i++) {
//     for (let j = i + 1; j < input.length; j++) {
//         if (input[i] + input[j] == target) {
//         }
//     }
// }


const fruits = ["Banana", "Orange", "Apple", "Mango"];

Array.prototype.printLast = function() {
    if(this.length == 0){
        return -1
    }
    return this[ this.length - 1]
};







