// الواجهات الأساسية (المفترضة من المهام السابقة)
interface Teacher {
    // طرق العمل المفترضة
    workFromHome(): string;
    getCoffeeBreak(): string;
    // الطريقة المحددة للمعلم (للتفريق في executeWork)
    workTeacherTasks(): string;
    salary: number; // إضافة خاصية الراتب لتسهيل المصنع
}

interface Director extends Teacher {
    numberOfReports: number;
    // الطريقة المحددة للمدير (للتفريق في executeWork)
    workDirectorTasks(): string;
}

// دالة المصنع لإنشاء الموظف بناءً على الراتب
// تُستخدم هنا للتأكد من أن المدير يمتلك workDirectorTasks والمعلم لا يمتلكها (بشكل مباشر)
function createEmployee(salary: number): Teacher | Director {
    // الدوال الأساسية المشتركة
    const baseMethods = {
        workFromHome: () => salary < 500 ? 'Cannot do from home' : 'Working from home',
        getCoffeeBreak: () => 'Getting a coffee break',
        workTeacherTasks: () => 'Getting to work', // النتيجة المتوقعة للمعلم
    };

    if (salary < 500) {
        // إرجاع كائن المعلم
        return {
            ...baseMethods,
            salary,
        } as Teacher;
    } else {
        // إرجاع كائن المدير
        return {
            ...baseMethods,
            salary,
            numberOfReports: 10,
            workDirectorTasks: () => 'Getting to director tasks', // النتيجة المتوقعة للمدير
        } as Director;
    }
}

// -----------------------------------------------------------
// 6. إنشاء وظائف خاصة بالموظفين (المطلوب)
// -----------------------------------------------------------

/**
 * دالة مسند النوع (Type Predicate) للتحقق مما إذا كان الموظف مديرًا.
 * التحقق يتم من خلال وجود الخاصية الفريدة للمدير workDirectorTasks.
 * @param employee كائن الموظف (Teacher أو Director).
 * @returns True إذا كان الكائن يطابق بنية المدير (Director).
 */
function isDirector(employee: Teacher | Director): employee is Director {
    // التحقق من وجود workDirectorTasks في الكائن
    return (employee as Director).workDirectorTasks !== undefined;
}

/**
 * تنفذ دالة العمل المناسبة بناءً على نوع الموظف.
 * @param employee كائن الموظف.
 * @returns نتيجة استدعاء دالة العمل.
 */
function executeWork(employee: Teacher | Director): string {
    if (isDirector(employee)) {
        // إذا كان مديرًا، استدعِ دالة المدير
        return employee.workDirectorTasks();
    }
    // وإلا (معلم)، استدعِ دالة المعلم
    return employee.workTeacherTasks();
}

// -----------------------------------------------------------
// اختبار النتائج المتوقعة
// -----------------------------------------------------------

console.log(`تنفيذ العمل للموظف ذو الراتب 200: ${executeWork(createEmployee(200))}`); // النتيجة المتوقعة: Getting to work
console.log(`تنفيذ العمل للموظف ذو الراتب 1000: ${executeWork(createEmployee(1000))}`); // النتيجة المتوقعة: Getting to director tasks

const employee1 = createEmployee(200);
const employee2 = createEmployee(1000);

console.log(`هل الموظف ذو الراتب 200 مدير؟ ${isDirector(employee1)}`); // النتيجة المتوقعة: false
console.log(`هل الموظف ذو الراتب 1000 مدير؟ ${isDirector(employee2)}`); // النتيجة المتوقعة: true