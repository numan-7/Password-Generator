const capitalCharacters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerCharacters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialCharacters= ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];

let passBtn = document.getElementById('psw-btn');
let passRange = document.getElementById("myRange");
let passLengthCounter = document.getElementById("psw-adjust");
let copyBtn = document.getElementById("copy-btn");

let passwordLength = 10;

let checkBoxes = {
    uppercase: false,
    lowercase: false,
    nums: false,
    specChars: false,
}

// check boxes
document.getElementById("ABC").addEventListener("click", (event) => {
    if(event.target.checked){
        checkBoxes[0] = true;
    } else {
        checkBoxes[0] = false;
    } 
});
document.getElementById("abc").addEventListener("click", (event) => {
    if(event.target.checked){
        checkBoxes[1] = true;
    } else {
        checkBoxes[1] = false;
    }
});
document.getElementById("123").addEventListener("click", (event) => {
    if(event.target.checked){
        checkBoxes[2] = true;
    } else {
        checkBoxes[2] = false;
    }
});
document.getElementById("#$&").addEventListener("click", (event) => {
    if(event.target.checked){
        checkBoxes[2] = true;
    } else {
        checkBoxes[2] = false;
    }
});

passBtn.addEventListener("click", event => {
    
});

// update the pass length var when a person clicks the slider
passRange.addEventListener("click", event => {
passwordLength = event.target.value;
  passLengthCounter.textContent = "adjust password length: " + passwordLength;
});
// update the pass length var when a person uses arrows to adjust the slider
passRange.addEventListener("keyup", event => {
    passwordLength = event.target.value;
      passLengthCounter.textContent = "adjust password length: " + passwordLength;
});
copyBtn.addEventListener("click", event => {
    let copyText = document.getElementById("pass-btn");
    // Select the text field
    content = copyText.textContent;
    // Copy the text inside the text field
    navigator.clipboard.writeText(content);
    alert("Copied the text: " + content);
});
// checks if one of the checkboxes have been checked
function checkCheck(){
    if(!uppercase && !lowercase && !nums && !specChars){
        alert("Please Check One of The Checkboxes to Generate");
        return false;
    } else {
        return true;
    }
}

