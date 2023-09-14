class DeleteBudgetView {
  _parentEl = document.querySelector(".section-2");

  _deleteHandler(fn) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".close-btn");
      const id = +btn.closest(".budget-item").dataset.id;
      if (!btn) return;
      if (btn) fn(id);
    });
  }
}

export default new DeleteBudgetView();
