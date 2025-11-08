// Director & Teacher Interfaces
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

// Classes
class Director implements DirectorInterface {
  workFromHome(): string { return "Working from home"; }
  getCoffeeBreak(): string { return "Getting a coffee break"; }
  workDirectorTasks(): string { return "Getting to director tasks"; }
}

class Teacher implements TeacherInterface {
  workFromHome(): string { return "Cannot work from home"; }
  getCoffeeBreak(): string { return "Cannot have a break"; }
  workTeacherTasks(): string { return "Getting to work"; }
}

// Create Employee
function createEmployee(salary: number | string): Director | Teacher {
  const numericSalary = typeof salary === "string" ? parseInt(salary) : salary;
  return numericSalary < 500 ? new Teacher() : new Director();
}

// Exported Functions
export function isDirector(employee: Director | Teacher): employee is Director {
  return (employee as Director).workDirectorTasks !== undefined;
}

export function executeWork(employee: Director | Teacher): string {
  if (isDirector(employee)) {
    return employee.workDirectorTasks();
  }
  return employee.workTeacherTasks();
}

// Test
console.log(executeWork(createEmployee(200)));
console.log(executeWork(createEmployee(1000)));
