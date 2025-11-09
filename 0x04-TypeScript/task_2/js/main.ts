// =======================================
// Interfaces
// =======================================
export interface Teacher {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}

export interface Director {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

// =======================================
// Classes
// =======================================
export class DirectorClass implements Director {
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

export class TeacherClass implements Teacher {
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

// =======================================
// createEmployee function
// =======================================
export function createEmployee(salary: number | string): Teacher | Director {
  if (typeof salary === "number" && salary < 500) {
    return new TeacherClass();
  }
  return new DirectorClass();
}

// =======================================
// Functions specific to employees
// =======================================
export function isDirector(employee: Teacher | Director): employee is Director {
  return (employee as Director).workDirectorTasks !== undefined;
}

export function executeWork(employee: Teacher | Director): string {
  if (isDirector(employee)) {
    return employee.workDirectorTasks();
  } else {
    return employee.workTeacherTasks();
  }
}

// =======================================
// String literal types
// =======================================
export type Subjects = "Math" | "History";

export function teachClass(todayClass: Subjects): string {
  if (todayClass === "Math") return "Teaching Math";
  return "Teaching History";
}
// ====== اختبار سريع ======
console.log(executeWork(createEmployee(200)));   // يجب أن يطبع: Getting to work
console.log(executeWork(createEmployee(1000)));  // يجب أن يطبع: Getting to director tasks
console.log(teachClass("Math"));                 // يجب أن يطبع: Teaching Math
console.log(teachClass("History"));              // يجب أن يطبع: Teaching History
