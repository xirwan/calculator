const numberButtons = document.querySelectorAll("button.number");
const operationButtons = document.querySelectorAll("button.equation");
const calculateButton = document.querySelector(".calculate");
const displayNumber = document.querySelector("#result");
const resetButton = document.querySelector(".reset");
let firstOperand = "";
let secondOperand = "";
let operator = "";
let result = "";

disableCalculate();
numberButtons.forEach((button) => {
    button.addEventListener("click", getValueNumber);
});
operationButtons.forEach((button) => {
    button.addEventListener("click", getValueOperator);
});
resetButton.addEventListener("click", resetResult);
calculateButton.addEventListener("click", calculateResult);
document.addEventListener("keydown", undoValue);

function display(number){
    if(result !== "" && operator !== "" && secondOperand !== ""){
        result = "";
        firstOperand += number;
        disableCalculate();
        return displayNumber.value = firstOperand;
    }
    if(operator === "" && secondOperand === ""){
        if(displayNumber.value === "0" && number === "."){
            firstOperand += displayNumber.value;
            firstOperand += ".";
            disableDecimal();
            disableCalculate();
            return displayNumber.value = firstOperand;
        } else if(displayNumber.value === "0" && number !== "0"){
            displayNumber.value = "";
            firstOperand += number;
            disableCalculate();
            return displayNumber.value = firstOperand;
        } else if(displayNumber.value === "0" && number === "0"){
            disableCalculate();
            return displayNumber.value = "0";
        } else {
            firstOperand += number;
            disableCalculate();
            return displayNumber.value = firstOperand;
        }
    } else {
        if(secondOperand === "" && number === "."){
            secondOperand = "0.";
            disableCalculate();
            return displayNumber.value = secondOperand;
        } else {
            secondOperand += number;
            disableDecimal();
            disableCalculate();
            return displayNumber.value = secondOperand;
        }
    }    
}

function disableCalculate(){
    if(result !== "" && secondOperand === ""){
        return calculateButton.disabled = true;
    } else if(secondOperand === ""){
        return calculateButton.disabled = true;
    } else {
        return calculateButton.disabled = false;
    }
}

function disableDecimal(){
    if(firstOperand.includes(".") && operator === ""){
        return document.querySelector("#decimal").disabled = true;
    } else if(secondOperand.includes(".")){
        return document.querySelector("#decimal").disabled = true;
    } else {
        return document.querySelector("#decimal").disabled = false;
    }
}

function getValueNumber(e){
    number = e.target.value;
    display(number);
}

function getValueOperator(e){
    if(operator !== "" && secondOperand !== ""){
        calculateResult();
        operator = e.target.value;
        disableDecimal();
    } else {
        operator = e.target.value;
        disableDecimal();
    }
}

function undoValue(e){
    if(e.key === "Backspace"){
        if(secondOperand !== ""){
            secondOperand = "";
            disableCalculate();
            return displayNumber.value = 0;
        } else if(operator !== ""){
            operator = "";
            disableCalculate();
        } else if(firstOperand !== ""){
            firstOperand = "";
            return displayNumber.value = 0;
        } else if(result !== ""){
            result = "";
            resetResult();
        }
    }
}

function resetResult(){
    displayNumber.value = 0;
    firstOperand = "";
    secondOperand = "";
    operator = "";
    result = "";
    disableDecimal();
    disableCalculate();
}

function calculateResult(){
    switch(operator){
        case "+":
            if(result !== ""){
                result = result + Number(secondOperand);
                displayNumber.value = result;
                secondOperand = "";
                operator = "";
            } else {
                result = Number(firstOperand) + Number(secondOperand);
                displayNumber.value = result
                firstOperand = "";
                secondOperand = "";
                operator = "";
            }
            break;
        case "-":
            if(result !== ""){
                result = result - Number(secondOperand);
                displayNumber.value = result;
                secondOperand = "";
                operator = "";
            } else {
                result = Number(firstOperand) - Number(secondOperand);
                displayNumber.value = result;
                firstOperand = "";
                secondOperand = "";
                operator = "";
            }
            break;
        case "*":
            if(result !== ""){
                result = result * Number(secondOperand);
                displayNumber.value = result;
                secondOperand = "";
                operator = "";
            } else {
                result = Number(firstOperand) * Number(secondOperand);
                displayNumber.value = result;
                firstOperand = "";
                secondOperand = "";
                operator = "";
            }
            break;
        case "/":
            if(secondOperand === "0"){
                resetResult();
                return alert("Cannot be divided by 0 !!!")
            }
            if(result !== ""){
                result = result / Number(secondOperand);
                displayNumber.value = result;
                secondOperand = "";
                operator = "";
            } else {
                result = Number(firstOperand) / Number(secondOperand);
                displayNumber.value = result;
                firstOperand = "";
                secondOperand = "";
                operator = "";
            }
            break;
    }
    disableCalculate();
}