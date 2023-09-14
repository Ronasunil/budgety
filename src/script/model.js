import { ID_LASTNUM, DELETE_COUNT } from "./config.js";

const state = {
  items: [],
  totalIncome: "",
  totalExpense: "",
  totalBudget: "",
};

const setLocalStorage = function () {
  localStorage.setItem("budgets", JSON.stringify(state.items));
};

const getLocalStorage = function () {
  state.items = JSON.parse(localStorage.getItem("budgets"));
  if (!state.items) state.items = [];
};

const findBudget = function (num) {
  return state.items.findIndex((budget) => budget._id === num);
};

const deleteBudget = function (budgetId) {
  // getting the index of deleting budget
  const budgetIndex = findBudget(budgetId);

  // deleting item
  state.items.splice(budgetIndex, DELETE_COUNT);

  // updating the local storage
  setLocalStorage();
};

const formater = function (value) {
  const options = {
    minimumFractionDigits: 2,
  };
  return Intl.NumberFormat("en-US", options).format(value);
};

const calc = function (condition) {
  let total;
  if (condition === "income") {
    total = state.items
      .filter((item) => item.amount > 0)
      .reduce((accumulator, item) => accumulator + item.amount, 0);

    state.totalIncome = total;
  }

  if (condition === "expense") {
    total = state.items
      .filter((item) => item.amount < 0)
      .reduce((accumulator, item) => accumulator + item.amount, 0);

    state.totalExpense = total;
  }

  if (condition === "budget") {
    total = state.items.reduce(
      (accumulator, item) => accumulator + item.amount,
      0
    );

    state.totalBudget = total;
  }
  return total;
};

const makeObject = function (obj, validation) {
  let item;

  //   check data is Accepted or not
  // false means accepted true means rejected
  if (validation !== false) return;

  class Budget {
    _id = Math.floor(Math.random() * ID_LASTNUM);
    constructor(type, description, amount) {
      this.type = type;
      this.description = description;
      this.amount = amount;
    }
  }

  class Expense extends Budget {
    constructor(type, description, amount) {
      super(type, description, amount);
      this.amount = -amount;
    }
  }
  class Income extends Budget {
    constructor(type, description, amount) {
      super(type, description, amount);
    }
  }

  if (obj.type === "income")
    item = new Income(obj.type, obj.description, obj.amount);
  if (obj.type === "expense")
    item = new Expense(obj.type, obj.description, obj.amount);

  state.items.push(item);
  console.log(state);
  setLocalStorage();
};

const validateData = function (obj) {
  // if (obj === undefined) return;
  if (obj.amount < 1) throw new Error(`No it's not an expense or income`);
  const objArr = Object.values(obj);

  return objArr.some((value) => value === "");
};

export {
  validateData,
  makeObject,
  calc,
  state,
  formater,
  deleteBudget,
  getLocalStorage,
};
