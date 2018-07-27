import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Variable from './Variable/Variable';

class App extends Component {
  state = {
    variables: [
      {
        name: `A`,
        value: 1
      },
      {
        name: `B`,
        value: 0
      },
      {
        name: `C`,
        value: 0
      }
    ],
    answers: ``
  }

  variableChangeHandler = (evt) => {
    const [...newState] = this.state.variables;
    newState.forEach((val, i) => {
      if (val.name === evt.target.name) {
        if (val.name === `A`) {
          newState[i].value = +evt.target.value || 1
        } else newState[i].value = +evt.target.value;
      }
    }) 
    this.setState({variables: newState}, this.refreshResult);
  }  
  
  refreshResult() {
    let result = this.displayAnswers(this.calculateQuadraticEquation());
    this.setState({
      answers: result
    })
  }

  calculateQuadraticEquation() {
    const [firstVariable, secondVariable, thirdVariable] = this.state.variables;
    const answers = [];
    let discriminant = Math.pow(secondVariable.value, 2) - 4 * firstVariable.value * thirdVariable.value;
    if (discriminant < 0) {
      answers.push(...this.getComplexAnswers(firstVariable.value, secondVariable.value, discriminant));
    } else {
      discriminant === 0 
      ? answers.push(this.getOneAnswer(firstVariable.value, secondVariable.value)) 
      : answers.push(...this.getTwoAnswers(firstVariable.value, secondVariable.value, discriminant));
    }
    return answers;
  }  

  getComplexAnswers(a, b, D) {
    let sqrtD = `${Math.sqrt(Math.abs(D)).toFixed(2)} * i`;
    let firstAnswer = `(${-b} + ${sqrtD}) / ${2 * a}`;
    let secondAnswer = `(${-b} - ${sqrtD}) / ${2 * a}`;
    return [firstAnswer, secondAnswer];
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
          <p className="App-description">Квадратное уравнение - это уравнение вида a * x^2 + b * x + c = 0, 
          где коэффициенты a, b и c - любые действительные числа, причем a !== 0. 
          <br/>Для получения корней просто введите коэффициенты a, b и с в поля ниже.</p>
          <fieldset className="App-inputs">
            {
              this.state.variables.map((val, i) => (
                <Variable 
                  changed={this.variableChangeHandler}
                  value={val.value}
                  name={val.name}
                  key={val.name}
                />
              ))
            }
          </fieldset>
          <pre className="App-answer">{this.state.answers}</pre>  
        </section>  
      </div>
    );
  }
}

export default App;
