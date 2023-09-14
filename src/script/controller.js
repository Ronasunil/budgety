import {
  validateData,
  makeObject,
  calc,
  state,
  formater,
  deleteBudget,
  getLocalStorage,
} from "./model.js";
import GetDataView from "./views/GetDataView.js";
import RenderView from "./views/RenderView.js";
import DeleteBudgetView from "./views/DeleteBudgetView.js";
import ErrorView from "./views/ErrorView.js";
const calcOverAll = function () {
  // calc function will return total value according to parameter
  calc("budget");
  calc("expense");
  calc("income");
};

const renderBudget = function (data) {
  // giving data to display
  RenderView._setData(data);

  // display the data
  RenderView._createMarkup();

  // clearing inputs
  GetDataView._clearInputs();
};
const updateUi = function () {
  // displaying the item
  renderBudget(state.items);

  // calcualting expense income and budget
  calcOverAll();

  // formater function will return the format state of value
  RenderView._renderTotal(formater(state.totalBudget), state.totalBudget);
  RenderView._renderTotalExp(formater(state.totalExpense));
  RenderView._renderTotalInc(formater(state.totalIncome));
};

const App = function (e) {
  try {
    // getting data from user
    const data = GetDataView._getData(e);

    // if pressed key is not enter then return from function
    if (!data) return;

    //   validating data
    const isValid = validateData(data);

    // if validation not sucess then return from function
    if (isValid === true) return;

    // creating an object
    makeObject(data, isValid);

    // update ui
    updateUi();
  } catch (err) {
    ErrorView._renderError(err.message);
  }
};

const deleteController = function (itemId) {
  // get clicked budget
  const id = itemId;

  // delete item
  deleteBudget(id);

  // update ui
  updateUi();
};

// init function
(function () {
  // display all budget if it is in local storage
  getLocalStorage();

  updateUi();
})();

const errHideController = function () {
  ErrorView._hideError();
};

GetDataView.handler(App);
DeleteBudgetView._deleteHandler(deleteController);
ErrorView._handler(errHideController);
