const calculator = {
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null,
}

const performCalculation = {
	'/': (firstOperand, secondOperand) => firstOperand / secondOperand,
	'*': (firstOperand, secondOperand) => firstOperand * secondOperand,
	'+': (firstOperand, secondOperand) => firstOperand + secondOperand,
	'-': (firstOperand, secondOperand) => firstOperand - secondOperand,
	'=': (firstOperand, secondOperand) => secondOperand,
}


inputDigit = (digit) => {
	const { displayValue, waitingForSecondOperand } = calculator;
	if (waitingForSecondOperand === true) {
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
	} else {
		calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
	}

	console.log(calculator)
}

inputDecimal = (dot) => {
	if (calculator.waitingForSecondOperand === true) return;

	if (!calculator.displayValue.includes(dot)) {
		calculator.displayValue += dot;
	}
} 

updateDisplay = () => {
	const display = document.querySelector('#output');
	display.value = calculator.displayValue;
}

handleOperator = (nextOperator) => {
	const { firstOperand, displayValue, operator } = calculator;
	const inputValue = parseFloat(displayValue);

	if (operator && calculator.waitingForSecondOperand) {
		calculator.operator = nextOperator;
		console.log(calculator);
		return;
	}

	if (firstOperand === null) {
		calculator.firstOperand = inputValue;
	} else if (operator) {
		const result = performCalculation[operator](firstOperand, inputValue);

		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	} 

	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;
	console.log(calculator)
}

resetCalculator = () => {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
	console.log(calculator);
}

deleteDisplay = () => {
	const { displayValue } = calculator;
	calculator.displayValue = displayValue.slice(0,displayValue.length);
}


updateDisplay();

const keys = document.querySelector('.calculatorKeys');
keys.addEventListener('click', (event) => {
	const { target } = event;
	if (!target.matches('button')) {
		return;
	}

	if (target.classList.contains('operator')) {
		handleOperator(target.value);
		updateDisplay();
		return;
	} 

	if (target.classList.contains('decimal')) {
		inputDecimal(target.value);
		updateDisplay();
		return;
	}

	if (target.classList.contains('clear')) {
		resetCalculator();
		updateDisplay();
		return;
	}

	if (target.classList.contains('delete')) {
		deleteDisplay();
		updateDisplay();
		return;
	}

	inputDigit(target.value);
	updateDisplay();
});

