import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  currentPage() {
    const curPage = this._data.page;
    return curPage;
  }

  nextBtn() {
    return `
      <button data-goto= "${
        this.currentPage() + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page${this.currentPage() + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }
  prevBtn() {
    return `
      <button data-goto = "${
        this.currentPage() - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.currentPage() - 1}</span>
      </button>`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are others pages
    if (this.currentPage() === 1 && numPages > 1) {
      return this.nextBtn();
    }

    // Last pages
    if (this.currentPage() === numPages && numPages > 1) {
      return this.prevBtn();
    }

    // Other pages
    if (this.currentPage() < numPages) {
      return this.nextBtn() + this.prevBtn();
    }

    // Page 1, and there are NO others pages
    return '';
  }
}

export default new PaginationView();
