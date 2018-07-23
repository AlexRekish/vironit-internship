;"use strict";

function Employee (name, surname, salary) {
    var name = name;
    var surname = surname;
    var salary = salary;

    this.getName = function () {
        return name;
    }

    this.setName = function (newName) {
        if (typeof(newName) === `string`) name = newName || name;
    }

    this.getSurname = function () {
        return surname;
    }

    this.setSurname = function (newSurname) {
        if (typeof (newSurname) === `string`) surname = newSurname || surname;
    }

    this.getFullName = function () {
        return `${name} ${surname}`;
    }

    this.getSalary = function () {
        return salary;
    }

    this.changeSalary = function (percent) {
        var coeff = +percent || 0;
        salary += salary * coeff / 100;
    }

}    

var employees = [
    new Employee('Дэн', 'Абрамов', 5000),
    new Employee('Эван', 'Ю', 5001),
    new Employee('Кот', 'Борис', 999999),
    new Employee('Николас', 'Закас', 9987),
    new Employee('Мош', 'Хамедани', 7363),
    new Employee('Илья', 'Кантор', 1234),
];

function printEmployees (employees) {
    employees.forEach((val) => {
        console.log(`Работник: ${val.getFullName()}, Зарплата: ${val.getSalary()}$`);
    });
}

function changeSalaryForEverybody (percent = 0, employees) {
    var coeff = +percent || 0;
    employees.forEach((val) => {
        val.changeSalary(coeff);
    });
}

printEmployees(employees);
changeSalaryForEverybody(20, employees);
printEmployees(employees);