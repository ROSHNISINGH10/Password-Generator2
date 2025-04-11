 const inputSilder = document.querySelector("[data-lengthSlider]");
 const lengthDisplay = document.querySelector("[data-lengthNumber]"); 

 const passwordDisplay = document.querySelector("[data-passwordDisplay]");
 const copyBtn = document.querySelector("[data-copy]");
 const copyMsg = document.querySelector("[data-copyMsg]");
 const uppercaseCheck  = document.querySelector("#uppercase");
 const lowercaseCheck = document.querySelector("#lowercase");
 const numbersCheck = document.querySelector("#numbers");
 const symbolsCheck = document.querySelector("#symbols");
 const indicator = document.querySelector("[data-indicator]");
 const generateBtn = document.querySelector(".generateButton");
 const allCheckBox = document.querySelectorAll("input[type=checkbox]");
 const symbols = '@#$%~<,>&^*();/?[]{}|!`_';

 let password = "";
 let passwordLength = 10;
 let checkCount = 0;
 handleSlider();
 //set strenght circle color to grey//
setIndicator("#ccc");
//  set passwordLength 

function handleSlider() {
    inputSilder.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSilder.min;
    const max = inputSilder.max;    
    inputSilder.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%";
}

function setIndicator(color){
indicator.style.backgroundColor = color;
indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max) {
  return Math.floor( Math.random() * (max - min)) + min;
}

function generateRandomNumber(){
  return getRndInteger(0,9);
}
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123)); // Corrected to String
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91)); // Corrected to String
}

   function generateSymbol(){
     const randNum = getRndInteger(0, symbols.length);
     return symbols.charAt[randNum];
   }

function calcStrength (){
    let hasUpper = false;
    let hasLower = false;
    let hasNum =  false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator ("#0f0")
    } else if (
        (hasLower || hasUpper) && 
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator('#f00');
    }
} 

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg. innerText = "copied";
    } catch (error) {
         copyMsg. innerText = "Failed";
    }

    //to make copy wala span visible
copyMsg.classList.add("active")

setTimeout (() => {
    copyMsg.classList.remove("active");
},2000);
}
 
function shufflePassword(array){
//fisher yates method
for (let i = array.length - 1; i> 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;    
}
let str = "";
array.forEach((el) => str += el);
return str;
}

function handleChekboxChange() {
    checkbox = 0 ;
    allCheckBox.forEach((checkbox) => {
     if(checkbox.checked)
         checkCount++;
    });
 }

//  special condition
if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
}

 allCheckBox.forEach( (checkbox)=>{
     checkbox.addEventListener('change', handleChekboxChange);
     })


inputSilder.addEventListener('input', (e) => {
    passwordLength = e.target.value; 
    handleSlider();
})

copyBtn.addEventListener ('click', () => {
    if(passwordDisplay.value)
        copyContent();
}) 

generateBtn.addEventListener('click',() => {
    //none of the checkbox is selected
    if (checkCount == 0)
         return;
         
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }


//lets start the journey to find new password
console.log("Starting the journey"); 

//remove old password
password = "";


//let's put the stuff in a new password
// if (uppercaseCheck.checked){
//     password += generateUpperCase();
// }

// if (lowercaseCheck.checked){
//     password += generateUpperCase();
// }

// if (numbersCheck.checked){
//     password += generateUpperCase();
// }

// if (symbols Check.checked){
//     password += generateUpperCase();
// }

let funcArr = [];
if (uppercaseCheck.checked)
 funcArr.push(generateUpperCase);

if (lowercaseCheck.checked)
funcArr.push(generateLowerCase);

if (numbersCheck.checked)
funcArr.push(generateRandomNumber);

if (symbolsCheck.checked)
 funcArr.push(generateSymbol);

//compulsory addition

for (let i = 0; i < funcArr.length; i++) { 
    password += funcArr[i]();
}
console.log("Compulsory addtion done");  

//remaining addition
for(let i = 0; i < passwordLength-funcArr.length; i++){
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("randIndex" + randIndex); ;
    password += funcArr[randIndex]();
}
console.log("Remaining addition done");
//shuffle the password

password = shufflePassword( Array.from(password));
console.log("shuffling done");

//show in UI
passwordDisplay.value = password;
console.log("UI additions done ")

//calculate strength
calcStrength();

});

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum); 
    // Fixed to use parentheses
}

generateBtn.addEventListener('click', () => {
    // none of the checkboxes is selected
    if (checkCount === 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // Start generating the password
    console.log("Starting the journey");

    // Remove old password
    password = "";

    // Create an array of functions based on selected checkboxes
    let funcArr = [];
    if (uppercaseCheck.checked) funcArr.push(generateUpperCase);
    if (lowercaseCheck.checked) funcArr.push(generateLowerCase);
    if (numbersCheck.checked) funcArr.push(generateRandomNumber);
    if (symbolsCheck.checked) funcArr.push(generateSymbol);

    // Compulsory addition
    for (let i = 0; i < checkCount; i++) {
        if (typeof funcArr[i] === "function") { 
            // Ensure funcArr[i] is a function
            password += funcArr[i]();
        }
    }
    console.log("Compulsory addition done");

     // Remaining addition
     for (let i = 0; i < passwordLength - checkCount; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        console.log("randIndex: " + randIndex);
        if (typeof funcArr[randIndex] === "function") {
             // Ensure funcArr[randIndex] is a function
            password += funcArr[randIndex]();
        }
    }
    console.log("Remaining addition done");

    // Shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");

    // Show in UI
    passwordDisplay.value = password;

     // Calculate strength
     calcStrength();
    });