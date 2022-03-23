class Calculator {
  constructor(previousResult, currentResult) {
    this.previousResult = previousResult
    this.currentResult = currentResult
    this.clearResult()
  }

  

  clearResult = () => {
    this.currentOperation = "";
    this.operation = undefined;
    this.previousOperation = "";

  }

  addNumber = (number) => {
    if (number === "•") {
      if (this.currentOperation.includes(".")) {
        return;
      }

      number = ".";
    }
    this.currentOperation = this.currentOperation.toString() + number.toString();
  };

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.calculate()
    }
    this.operation = operation
    this.previousOperation = this.currentOperation
    this.currentOperation = ''
  }


  calculate = () => {
    let calc
    if (!this.previousOperation || !this.currentOperation) {
      return
    }
    const previous = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);

    if (isNaN(previous) || isNaN(current)) {
      return
    }
    switch (this.operation) {
      case '+':
        calc = previous + current;
        break;
      case '-':
        calc = previous - current;
        break;
      case 'x':
        calc = previous * current;
        break;
      case '÷':
        if (current === 0) {
          clearResult();
          return;
        }
        calc = previous / current;
        break;
      case '√':
        calc = Math.pow(previous, 1 / current);
        break;
      case '%':
        calc = previous / 100 * current;
        break;
      case '^':
        calc = Math.pow(previous, current);
        break;
      case 'log':
        calc = Math.log(previous) / Math.log(current);
        break;
      default:
        return;
    }

    this.currentOperation = calc;
    this.operation = undefined;
    this.previousOperation = '';

  }

  deleteNumber = () => {
    this.currentOperation = this.currentOperation.toString().slice(0, -1)
  };


  updateResult() {
    this.currentResult.innerText = this.currentOperation
    if (this.operation != null) {
      this.previousResult.innerText =
        `${this.previousOperation} ${this.operation}`
    } else {
      this.previousResult.innerText = ''
    }
  }
}

const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const remove = document.querySelector('.delete')
const equality = document.querySelector('.equality');
const previousResult = document.querySelector('.previous-operation')
const currentResult = document.querySelector('.current-operation')

const calculator = new Calculator(previousResult, currentResult)

numbers.forEach(number => {
  number.addEventListener("click", () => {
    calculator.addNumber(number.innerText);
    calculator.updateResult();
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    calculator.chooseOperation(operator.innerText);
    calculator.updateResult();
  })
})

equality.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateResult();
})

remove.addEventListener('click', () => {
  calculator.deleteNumber();
  calculator.updateResult();
})

clear.addEventListener('click', () => {
  calculator.clearResult();
  calculator.updateResult();
})