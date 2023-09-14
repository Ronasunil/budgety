class Deatils {
  _description = document.querySelector(".input-description");
  _type = document.querySelector(".select-add");
  _amount = document.querySelector(".input-number");

  _getData(e) {
    if (e.key === "Enter") {
      return {
        description: this._description.value,
        amount: +this._amount.value,
        type: this._type.value,
      };
    } else return false;
  }

  handler(fn) {
    window.addEventListener("keypress", fn);
  }

  _clearInputs() {
    this._description.value = this._amount.value = "";
    this._description.focus();
  }
}

export default new Deatils();
