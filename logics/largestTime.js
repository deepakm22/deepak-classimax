const timeFormat = (arr) => {
    let result = [];
    let newArray = []

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            result.push(`${arr[i]}${arr[j]}`); 
        }  
    }
    for(let i = 0 ; i < result.length; i++){
        for(let j = 0; j < result.length; j++){
            if(result[i] < 24){
                // console.log(result[i], ":" , result[j]);
                newArray.push(`${result[i]} : ${result[j]}`)
            }
            
        }

    }
// console.log(newArray);
return newArray;

}

let myTime = [1, 2, 3, 4];
console.log(timeFormat(myTime));






