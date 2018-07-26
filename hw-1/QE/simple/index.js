;"use strict";

// a * x^2 + b * x + c = 0

(function () {
    alert(`Квадратное уравнение - это уравнение вида a * x^2 + b * x + c = 0, где коэффициенты a, b и c - любые действительные числа, причем a !== 0. Для получения корней уравнения нажмите ОК и введите коэффициенты a, b и с`);
    let firstCoefficient;  // a
    firstCoefficient = +prompt(`Введите А`);
    let secondCoefficient = +prompt(`Введите B`) || 0;  //b
    let thirdCoefficient = +prompt(`Введите C`) || 0;  // c

    const answers = [];
    
    while (!firstCoefficient || isNaN(firstCoefficient)) {
        alert('A не может быть пустым!');
        firstCoefficient = +prompt(`Введите А`);
    }

    let discriminant = Math.pow(secondCoefficient, 2) - 4 * firstCoefficient * thirdCoefficient;
    if (discriminant < 0) {
        alert ('Нет действительных решений, вычисляем комплексные. В комплексных решениях используется i - мнимая единица. Мнимая единица - это комплексное число, квадрат которого равен -1.');
        let sqrtD = `${Math.sqrt(Math.abs(discriminant)).toFixed(2)} * i`;
        let firstAnswer = `(${-secondCoefficient} + ${sqrtD}) / ${2 * firstCoefficient}`;
        let secondAnswer = `(${-secondCoefficient} - ${sqrtD}) / ${2 * firstCoefficient}`;
       answers.push(firstAnswer, secondAnswer);
    } else {
        discriminant === 0 ? answers.push(getOneAnswer(firstCoefficient, secondCoefficient)) : answers.push(...getTwoAnswers(firstCoefficient, secondCoefficient, discriminant));
    }
    alert(displayAnswers(answers));
    
    function getOneAnswer(a, b) {
        return (-b / (2 * a)).toFixed(2);
    }

    function getTwoAnswers(a, b, D) {
        return [
            ((-b + Math.sqrt(D)) / (2 * a)).toFixed(2),
            ((-b - Math.sqrt(D)) / (2 * a)).toFixed(2)
        ]
    }

    function displayAnswers(arr) {
        let count = arr.length;
        let answer = arr.map((val, i) => `x${i + 1} : ${val}`)
        return `
        Количество решений: ${count}
        ${answer.join(`
        `)};
    `
    }
})();

