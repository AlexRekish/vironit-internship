import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Variable from './Variable/Variable';

class App extends Component {
  state = {
    firstVariable: {
      name: `A`,
      value: 1
    },
    secondVariable: {
      name: `B`,
      value: 0
    },
    thirdVariable: {
      name: `C`,
      value: 0
    },
    answers: ``
  }

  firstVariableChangeHandler = (evt) => {
    this.setState({
      firstVariable: {
        name: `A`,
        value: +evt.target.value || 1 
      }
    }, this.refreshResult);
  }  

  secondVariableChangeHandler = (evt) => {
    this.setState({
      secondVariable: {
        name: `B`,
        value: +evt.target.value
      }
    }, this.refreshResult);
  }

  thirdVariableChangeHandler = (evt) => {
    this.setState({
      thirdVariable: {
        name: `C`,
        value: +evt.target.value
      }
    }, this.refreshResult);
  }
  
  refreshResult() {
    let result = this.calculateQuadraticEquation();
    this.setState({
      answers: result
    })
  }

  calculateQuadraticEquation() {
    const answers = [];
    let discriminant = Math.pow(this.state.secondVariable.value, 2) - 4 * this.state.firstVariable.value * this.state.thirdVariable.value;
    if (discriminant < 0) {
      // alert('Нет действительных решений, вычисляем комплексные. В комплексных решениях используется i - мнимая единица. Мнимая единица - это комплексное число, квадрат которого равен -1.');
      let sqrtD = `${Math.sqrt(Math.abs(discriminant)).toFixed(2)} * i`;
      let firstAnswer = `(${-this.state.secondVariable.value} + ${sqrtD}) / ${2 * this.state.firstVariable.value}`;
      let secondAnswer = `(${-this.state.secondVariable.value} - ${sqrtD}) / ${2 * this.state.firstVariable.value}`;
      answers.push(firstAnswer, secondAnswer);
    } else {
      discriminant === 0 
      ? answers.push(this.getOneAnswer(this.state.firstVariable.value, this.state.secondVariable.value)) 
      : answers.push(...this.getTwoAnswers(this.state.firstVariable.value, this.state.secondVariable.value, discriminant));
    }

    return this.displayAnswers(answers);
  }  

  getOneAnswer(a, b) {
    return (-b / (2 * a)).toFixed(2);
  }

  getTwoAnswers(a, b, D) {
    return [
      ((-b + Math.sqrt(D)) / (2 * a)).toFixed(2),
      ((-b - Math.sqrt(D)) / (2 * a)).toFixed(2)
    ]
  }

  displayAnswers(arr) {
    let count = arr.length;
    let answer = arr.map((val, i) => `x${i + 1} : ${val}`)
    return `
      Количество решений: ${count}
      ${answer.join(`
      `)}
    `
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <section>
          <h2>Решение квадратных уравнений</h2>
          <p className="App-description">Квадратное уравнение - это уравнение вида a * x^2 + b * x + c = 0, где коэффициенты a, b и c - любые действительные числа, причем a !== 0. <br/>Для получения корней просто введите коэффициенты a, b и с в поля ниже.</p>
          <fieldset className="App-inputs">
            <Variable 
              changed={this.firstVariableChangeHandler}
              value={this.state.firstVariable.value}
              valueName={this.state.firstVariable.name}
            />
            <Variable
              changed={this.secondVariableChangeHandler}
              value={this.state.secondVariable.value}
              valueName={this.state.secondVariable.name}
            />
            <Variable
              changed={this.thirdVariableChangeHandler}
              value={this.state.thirdVariable.value}
              valueName={this.state.thirdVariable.name}
            />
          </fieldset>
          <pre className="App-answer">{this.state.answers}</pre>  
        </section>  
      </div>
    );
  }
}

export default App;
