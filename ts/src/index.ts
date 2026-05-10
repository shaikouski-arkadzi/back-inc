// 1. Создай переменные age1/title1/isReady1 с типами number/string/boolean
let age1: number, title1: string, isReady1: boolean;

// 2. Опиши литеральный тип Mode, который может иметь значения "light или "dark"
// и переменную currentMode этого типа
type Mode = "light" | "dark";
let currentMode: Mode;

// 3. Создай тип ID как объединение number | string и две переменные с разными значениями
type ID = number | string;
let idPerson: ID = 1;
idPerson = "1";

// 4. Создай переменные nums (массив чисел) и names (массив строк). Явно их типизируй
const nums: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Alice", "Bob", "Charlie"];

// 5. Создай объект product и задай тип «на месте»: product имеет id (число), name (строка), price (число)
let product: {
  id: number;
  name: string;
  price: number;
};

// 6. Дай имя типу Person, у которого id число, name строка и создай переменную p этого типа
type Person = {
  id: number;
  name: string;
};

const p: Person = {
  id: 1,
  name: "Alice",
};

// 7. Напиши функцию sizeOf: принимает string | number → возвращает number (длина строки или само число)
function sizeOf(value: string | number): number {
  if (typeof value === "string") {
    return value.length;
  }

  return value;
}

// 8. Опиши тип User: id — number, name — string, nickname — опционально (string)
type User = {
  id: number;
  name: string;
  nickname?: string;
};

// 9. Функция hello: принимает User → возвращает "Hi, Ann (@ann)" или "Hi, Ann" (если нет nickname). Реализуй ее
function hello(user: User): string {
  return `Hi, ${user.name}${user.nickname ? ` (@${user.nickname})` : ""}`;
}

// 10. Типизируй стрелочную функцию lower: принимает string → возвращает string
const lower = (value: string): string => "";

// 11. Опиши тип функции Calc: принимает 2 аргумента number (a, b), возвращает number
type Calc = (a: number, b: number) => number;

// 12. Реализуй 2 функции: add (складывает 2 числа) и mul (перемножает) с типом Calc
function add(a: number, b: number): number {
  return a + b;
}
const mul: Calc = (a, b) => {
  return a + b;
};

// 13. Напиши функцию log: принимает message (строка), ничего не возвращает (void). Просто логирует message в консоль
function log(message: string): void {
  console.log(message);
}

// 14. Напиши и типизируй функцию firstEven: принимает массив чисел
// и возвращает первое четное число или undefined (если в массиве нет четных)
function firstEven(nums: number[]): number | undefined {
  return nums.find((num) => num % 2 === 0);
}

// 15. Опиши тип Profile2 (id число, name: строка, age опциональное поле число);
// напиши функцию ageLabel(p:Profile2):string (с проверкой undefined)
type Profile2 = {
  id: number;
  name: string;
  age?: number;
};
function ageLabel(p: Profile2): string {
  if (p.age === undefined) return "age unknown";
  return p.name;
}

// 16. Напиши и типизируй функцию createPagination. Принимает 3 аргумента page число, pageSize число
// sortBy строка со значением по умолчанию 'createdAt'.
// Функция возвращает объект
// { page: number;
//   pageSize: number,
//   sortBy: string }
function createPagination(
  page: number,
  pageSize: number,
  sortBy: string = "createdAt",
): { page: number; pageSize: number; sortBy: string } {
  return {
    page,
    pageSize,
    sortBy,
  };
}

// 17. Создай литеральный тип Result и функцию isOk которая принимает Result
// и возвращает boolean (true если "ok" и false если "fail")
type Result = "ok" | "fail";
function isOk(result: Result): boolean {
  return result === "ok";
}
