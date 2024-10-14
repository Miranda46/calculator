var miniMenu = new Object();
miniMenu.operation = "";
miniMenu.operationSign = "";
miniMenu.ans = 0;
miniMenu.leftSide = "";
miniMenu.rightSide = "";



function sumStrings(a,b) { 
    return ((+(a)) + (+b)).toString();
}

function updateCalculation(){
    if (miniMenu.operationSign != ""){
        str = miniMenu.leftSide + " " + miniMenu.operationSign + " " + miniMenu.rightSide;
    }
    else {
        str = miniMenu.leftSide;
    }
    document.getElementById("calculation").innerHTML = str;
}

function displayCalculation(number){
    if (miniMenu.operation == ""){
        miniMenu.leftSide += number;
    }
    else {
        miniMenu.rightSide += number;
    }
    updateCalculation();
    
}

function display(number){
    document.getElementById("calculation").innerHTML = number;
}

function getCalculation(){
    return document.getElementById("calculation").innerHTML;
}

function addListener(type, func, name){
    name.addEventListener(type, func);
}

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener("click", handleClick, true)
});

function handleClick(event) {
    displayCalculation(event.target.innerHTML);
}

document.addEventListener("keydown", (e) => {
    if (e.key in [0,1,2,3,4,5,6,7,8,9]){
        displayCalculation(e.key);
    }
    else if (e.key == "/") {
        handleDivide();
    }
    else if (e.key == "+") {
        handlePlus();
    }
    else if (e.key == "-") {
        handleMinus();
    }
    else if (e.key == "x" || e.key == "*") {
        handleMult();
    }
    else if (e.key == "=" || e.key == 'Enter') {
        handleEquals();
    }
    else if (e.key == ".") {
        handlePoint();
    }
    else if (e.key == "Backspace") {
        handleBackspace();
    }

  });

const bs = document.querySelector(".bs");
bs.addEventListener('click', handleBackspace)
function handleBackspace(event) {
    str = document.getElementById("calculation").innerHTML;
    if(str.slice(-1) === " "){
        str = str.slice(0, -3);
    }
    else {
        str = str.slice(0, -1);
    }
    document.getElementById("calculation").innerHTML = str;
}

function handleOperators(name, display){
    if (miniMenu.operationSign !== "" && miniMenu.rightSide == "")
    {
        miniMenu.operationSign = display;
        miniMenu.operation = name;
        updateCalculation("");
        return;
    }
    if (miniMenu.operationSign == "")
    {
        miniMenu.operation = name;
        str = getCalculation();
        miniMenu.leftSide = str;
        miniMenu.operationSign = display;
        displayCalculation("");
        return;
    }
    if (miniMenu.operationSign !== "" && miniMenu.rightSide != ""){
        handleEquals("");
        miniMenu.leftSide = miniMenu.ans;
        miniMenu.ans = "";
        miniMenu.operationSign = display;
        miniMenu.operation = name;
        updateCalculation();

    }

}

const plus = document.querySelector(".sum");
plus.addEventListener('click', handlePlus)
function handlePlus(event) {
    handleOperators('sum', '+');
}

const minus = document.querySelector(".rest");
minus.addEventListener('click', handleMinus)
function handleMinus(event) {
    handleOperators('rest', '-');
}

const mult = document.querySelector(".multiply");
mult.addEventListener('click', handleMult)
function handleMult(event) {
    handleOperators('mult', 'x');
}

const divide = document.querySelector(".divide");
divide.addEventListener('click', handleDivide)
function handleDivide(event) {
    handleOperators('div', '÷');
}

const clearAll = document.querySelector(".clear");
clearAll.addEventListener('click', clearScreen);
function clearMiniMenu(){
    miniMenu.leftSide = "";
    miniMenu.rightSide = "";
    miniMenu.operation = "";
    miniMenu.operationSign = "";
}
function clearScreen(event){
    document.getElementById("calculation").innerHTML = "";
    clearMiniMenu();
}

function riseError(e = "MATH ERR!"){
    clearMiniMenu();
    displayCalculation(e);
    setTimeout(() => {
        clearScreen();
    }, 1000);
}

function getSide(){
    if (miniMenu.operationSign === ""){
        return miniMenu.leftSide;
    }
    else{
        return miniMenu.rightSide;
    }
}

const point = document.querySelector(".point");
point.addEventListener('click', handlePoint);
function handlePoint(event){
    str = getSide();
    last = str.slice(-1)
    if (last === ".")
    {
        return;
    }
    else if (last === ' ' || str === ""){
        displayCalculation("0.");
    }
    else if (!str.includes(".")){
        displayCalculation(".");
    }
}

const equal = document.querySelector(".equal");
equal.addEventListener('click', handleEquals);
function handleEquals(event){
    let total = 0;
    if (miniMenu.operation == "") {
       return; 
    }
    else if(miniMenu.operation === 'sum'){
        total = sumStrings(miniMenu.leftSide, miniMenu.rightSide);
        display(total); 
  
    }
    else if(miniMenu.operation === 'rest'){
        total = sumStrings(miniMenu.leftSide, -miniMenu.rightSide);
        display(total); 
    }

    else if(miniMenu.operation === 'mult'){
        total = (+miniMenu.leftSide) * (+miniMenu.rightSide);
        display(total); 
    }

    else if(miniMenu.operation === 'div'){
        if (miniMenu.rightSide == 0){
            riseError();
            return;
        }
        total = (+miniMenu.leftSide) / (+miniMenu.rightSide);
        display(total.toPrecision(3)); 
    }

    clearMiniMenu();
    miniMenu.ans = total;
}