// =================================================================
// 2️⃣ Classes Director & Teacher
// =================================================================
var Director = /** @class */ (function () {
    function Director() {
    }
    Director.prototype.workFromHome = function () {
        return "Working from home";
    };
    Director.prototype.getCoffeeBreak = function () {
        return "Getting a coffee break";
    };
    Director.prototype.workDirectorTasks = function () {
        return "Getting to director tasks";
    };
    return Director;
}());
var Teacher = /** @class */ (function () {
    function Teacher() {
    }
    Teacher.prototype.workFromHome = function () {
        return "Cannot work from home";
    };
    Teacher.prototype.getCoffeeBreak = function () {
        return "Cannot have a break";
    };
    Teacher.prototype.workTeacherTasks = function () {
        return "Getting to work";
    };
    return Teacher;
}());
// =================================================================
// 3️⃣ Function createEmployee
// =================================================================
function createEmployee(salary) {
    var numericSalary = typeof salary === "string" ? parseInt(salary) : salary;
    if (numericSalary < 500) {
        return new Teacher();
    }
    else {
        return new Director();
    }
}
// =================================================================
// 4️⃣ Type predicate (isDirector)
// =================================================================
function isDirector(employee) {
    return employee.workDirectorTasks !== undefined;
}
// =================================================================
// 5️⃣ executeWork function
// =================================================================
function executeWork(employee) {
    if (isDirector(employee)) {
        return employee.workDirectorTasks();
    }
    return employee.workTeacherTasks();
}
// ✅ Expected result test
console.log(executeWork(createEmployee(200))); // Getting to work
console.log(executeWork(createEmployee(1000))); // Getting to director tasks
