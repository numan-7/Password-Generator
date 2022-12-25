const capitalCharacters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerCharacters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialCharacters= ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];

let passGen = [];

// array that tells which arrays are in the pass gen
let arraysNum = [];

const passBtn = document.getElementById('psw-btn');
const passRange = document.getElementById("myRange");
const passLengthCounter = document.getElementById("psw-adjust");
const copyBtn = document.getElementById("copy-btn");
const themeIcon = document.getElementById("icon");
const theme = document.getElementById("theme");
const checkBoxTheme = document.getElementById("selection");
const genColor = document.getElementById("genColor");


let passwordLength = 10;
let catCounter = 0;

let checkBoxes = {
    uppercase: false,
    lowercase: false,
    nums: false,
    specChars: false,
}

/*
    Code for theme
*/

// user wants to switch theme
function switchIcon(){
    if(localStorage.getItem("Theme") ==  "light"){
        setTheme("dark")
    } else { 
        setTheme("light")
    } 
}

function setTheme(themeSet){
    if (themeSet === "light"){
        // adjust the background color to light
        theme.classList.remove("wrapperDark"); 
        // changes the font color of the "password length: x"
        passLengthCounter.style.color = '#374151';
        // changes the font color of the checkboxes
        checkBoxTheme.style.color = '#374151';
        // changes the font color of the text "Generate a"
        genColor.style.color = "black";
        themeIcon.style.filter = "";
        themeIcon.style.transform = "scaleX(1)";
        localStorage.setItem('Theme', 'light');
    } else {
        // adjust the background color to dark
        theme.classList.add("wrapperDark"); 
        // changes the font color of the "password length: x"
         passLengthCounter.style.color = '#6B7280';
        // changes the font color of the checkboxes
        checkBoxTheme.style.color = '#6B7280';
        // changes the font color of the text "Generate a"
        genColor.style.color = "#E5E7EB";
        themeIcon.style.filter = "invert(35%) sepia(96%) saturate(661%) hue-rotate(121deg) brightness(100%) contrast(96%)";
        themeIcon.style.transform = "scaleX(-1)";
        localStorage.setItem('Theme', 'dark');
    }
}

/*
    Password Generation
*/

// gets rid of any pass generated password showing up
function resetContents(){
    document.getElementById("pass-btn").textContent = " ";
}

function shuffleArr(){
    // shuffles final array
    for (var i = passGen.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = passGen[i];
        passGen[i] = passGen[j];
        passGen[j] = temp;
    }
}

function pushBack(name){
    // push arrays into one
    switch(name){
        case 1:
            arraysNum.push(1);
            passGen.push(...capitalCharacters);
            break;
        case 2:
            arraysNum.push(2);
            passGen.push(...lowerCharacters);
            break;
        case 3:
            arraysNum.push(3);
            passGen.push(...numbers);
            break;
        case 4:
            arraysNum.push(4);
            passGen.push(...specialCharacters);
            break;
        default:
            break;
    }
    shuffleArr(passGen);
}

// really a brute force method of removing it all, will need to improve in the future
function remove(name){
    // redefine array and reset it
    passGen = [];
    
    let newArray = [];
    // have to create a new array here because using old array (arraysNum) will cause an infinite loop in the for loop
    newArray = arraysNum;
    
    // removing the array num
    var index = newArray.indexOf(name);
    if (index > -1) {
        newArray.splice(index, 1);
    }
    arraysNum = [];
    for(let i = 0; i < newArray.length; i++){
        pushBack(newArray[i]);
    }
}

// check boxes
document.getElementById("ABC").addEventListener("click", (event) => {
    resetContents()
    if(event.target.checked){
        checkBoxes.uppercase = true;
        pushBack(1);
    } else {
        remove(1);
        checkBoxes.uppercase = false;
    } 
});
document.getElementById("abc").addEventListener("click", (event) => {
    resetContents()
    if(event.target.checked){
        checkBoxes.lowercase = true;
        pushBack(2);
    } else {
        remove(2);
        checkBoxes.lowercase = false;
    }
});
document.getElementById("123").addEventListener("click", (event) => {
    resetContents()
    if(event.target.checked){
        checkBoxes.nums = true;
        pushBack(3);
    } else {
        remove(3);
        checkBoxes.nums = false;
    }
});
document.getElementById("#$&").addEventListener("click", (event) => {
    resetContents()
    if(event.target.checked){
        checkBoxes.specChars = true;
        pushBack(4);
    } else {
        remove(4);
        checkBoxes.specChars = false;
    }
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

// checks if one of the checkboxes have been checked
function checkCheck(){
    let checker = false;
    if(checkBoxes.uppercase || checkBoxes.lowercase || checkBoxes.nums || checkBoxes.specChars) {
       checker = true;
    }
    return checker;
}

passBtn.addEventListener("click", event => {
    // document.getElementById("pass-btn").textContent = "";
    var result = " ";
    if(checkCheck()){
        // one of the check boxes is check so begin generating password
        for(let i = 0; i < passwordLength; i++){
            // let chooseGroup = Math.floor(Math.abs(Math.random() * catCounter));
            var random = Math.floor(Math.random() * passGen.length);
            result += passGen[random];
        }
        document.getElementById("pass-btn").textContent = result;
        // document.getElementById("pass-btn").textContent = result;
    } else{
        alert("Please select a check box.")
    }
});

/*
    Copy to keyboard
*/
   copyBtn.addEventListener("click", event => {
    let copyText = document.getElementById("pass-btn");
    // Select the text field
    content = copyText.textContent;
    // Copy the text inside the text field
    navigator.clipboard.writeText(content);
    alert("Copied the text: " + content);
});
