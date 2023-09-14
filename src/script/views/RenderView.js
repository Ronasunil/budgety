class RenderView {
  _labelTotal = document.querySelector(".month-budget-value");
  _labelTotalIncome = document.querySelector(".income-box-value");
  _labelTotalExpense = document.querySelector(".expense-box-value");
  _data;
  _incomeConatiner = document.querySelector(".income-list");
  _expenseContainer = document.querySelector(".expense-list");
  _setData(data) {
    this._clear(this._incomeConatiner);
    this._clear(this._expenseContainer);
    this._data = data;
  }

  _createMarkup() {
    console.log(this._data);
    this._data.forEach((budget) => {
      this._renderData(budget);
    });
  }
  _renderData(data) {
    console.log(data);
    const html = `<div class="${data.type}-item budget-item" data-id="${
      data._id
    }">
                    <span class="${data.type}-item-name">${
      data.description
    }</span>
                    <div class="row">
                        <span class="${data.type}-item-value"data>${
      data.type === "income" ? "+" : ""
    }${data.amount}</span>
                        <button class="close-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-${
                              data.type
                            }">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    
                </div>`;

    document
      .querySelector(`.${data.type}-list`)
      .insertAdjacentHTML("beforeend", html);
  }

  _clear(el) {
    el.innerHTML = "";
  }

  _renderTotal(formatedTotal, total) {
    this._labelTotal.textContent = `${+total < 0 ? "" : "+"}${formatedTotal}`;
  }

  _renderTotalExp(total) {
    this._labelTotalExpense.textContent = `${total}`;
  }

  _renderTotalInc(total) {
    this._labelTotalIncome.textContent = `+${total}`;
  }
}

export default new RenderView();
