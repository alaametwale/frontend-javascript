// =================================================================
// 1️⃣ DirectorInterface & TeacherInterface
// =================================================================
interface DirectorInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

interface TeacherInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}

// =================================================================
// 2️⃣ Classes Director & Teacher
// =================================================================
class Director implements DirectorInterface {
  workFromHome(): string {
    return "Working from home";
  }
  getCoffeeBreak(): string {
    return "Getting a coffee break";
  }
  workDirectorTasks(): string {
    return "Getting to director tasks";
  }
}

class Teacher implements TeacherInterface {
  workFromHome(): string {
    return "Cannot work from home";
  }
  getCoffeeBreak(): string {
    return "Cannot have a break";
  }
  workTeacherTasks(): string {
    return "Getting to work";
  }
}

// =================================================================
// 3️⃣ Function createEmployee
// =================================================================
function createEmployee(salary: number | string): Director | Teacher {
  const numericSalary = typeof salary === "string" ? parseInt(salary) : salary;

  if (numericSalary < 500) {
    return new Teacher();
  } else {
    return new Director();
  }
}

// =================================================================
// 4️⃣ Type predicate (isDirector)
// =================================================================
function isDirector(employee: Director | Teacher): employee is Director {
  return (employee as Director).workDirectorTasks !== undefined;
}

// =================================================================
// 5️⃣ executeWork function
// =================================================================
function executeWork(employee: Director | Teacher): string {
  if (isDirector(employee)) {
    return employee.workDirectorTasks();
  }
  return employee.workTeacherTasks();
}

// ✅ Expected result test
console.log(executeWork(createEmployee(200)));  // Getting to work
console.log(executeWork(createEmployee(1000))); // Getting to director tasks
