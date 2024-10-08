var miniMenu = new Object();
miniMenu.operation = "";
miniMenu.operationSign = "";
miniMenu.ans = 0;
miniMenu.leftSide = "";
miniMenu.rightSide = "";

function sumStrings(a,b) { 
    return ((BigInt(a)) + BigInt(b)).toString();
}

function displayCalculation(number){
    if (miniMenu.operation == ""){
        miniMenu.leftSide += number;
    }
    else {
        miniMenu.rightSide += number;
    }
    str = miniMenu.leftSide + " " + miniMenu.operationSign + " " + miniMenu.rightSide;
    document.getElementById("calculation").innerHTML = str;
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
    miniMenu.operation = name;
    str = getCalculation();
    miniMenu.leftSide = str;
    miniMenu.operationSign = display;
    displayCalculation("");
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

const point = document.querySelector(".point");
point.addEventListener('click', handlePoint);
function handlePoint(event){
    last = document.getElementById("calculation").innerHTML.slice(-1)
    if (last === ".")
    {
        return;
    }
    else if (last === ' ' || last === ""){
        displayCalculation("0.");
    }
    else {
        displayCalculation(".");
    }
}

const equal = document.querySelector(".equal");
equal.addEventListener('click', handleEquals);
function handleEquals(event){
    console.log(miniMenu)
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
        total = (+miniMenu.leftSide) / (+miniMenu.rightSide);
        display(total.toPrecision(3)); 
    }

    clearMiniMenu();
    miniMenu.ans = total;
}