;"use strict";

function Employee(name, surname, salary) {
    this._name = name;
    this._surname = surname;
    this._salary = salary;
}

    Employee.prototype.getName = function () {
        return this._name;
    }

    Employee.prototype.setName = function (newName) {
        if (typeof (newName) === `string`) this._name = newName || this._name;
    }

    Employee.prototype.getSurname = function () {
        return this._surname;
    }

    Employee.prototype.setSurname = function (newSurname) {
        if (typeof (newSurname) === `string`) this._surname = newSurname || this._surname;
    }

    Employee.prototype.getFullName = function () {
        return `${this._name} ${this._surname}`;
    }

    Employee.prototype.getSalary = function () {
        return this._salary.toFixed(2);
    }

    Employee.prototype.changeSalary = function (percent) {
        var coeff = +percent || 0;
        this._salary += this._salary * coeff / 100;
    }


var employees = [
    new Employee('Дэн', 'Абрамов', 5000),
    new Employee('Эван', 'Ю', 5001),
    new Employee('Кот', 'Борис', 999999),
    new Employee('Николас', 'Закас', 9987),
    new Employee('Мош', 'Хамедани', 7363),
    new Employee('Илья', 'Кантор', 1234),
];

function printEmployees(employees) {
    employees.forEach((val) => {
        console.log(`Работник: ${val.getFullName()}, Зарплата: ${val.getSalary()}$`);
    });
}

function changeSalaryForEverybody(percent = 0, employees) {
    var coeff = +percent || 0;
    employees.forEach((val) => {
        val.changeSalary(coeff);
    });
}

printEmployees(employees);
changeSalaryForEverybody(-23, employees);
console.log(` 
`);
printEmployees(employees);
console.log(employees[2].getName());
employees[2].setSurname(`Мурчаль`);
console.log(employees[2].getSurname());
printEmployees(employees);

