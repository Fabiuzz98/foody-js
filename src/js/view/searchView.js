import View from './view.js';
import icons from 'url:../../img/icons.svg';

const userInput = document.querySelector('.search__field');
const resultsContainer = document.querySelector('.results');
const searchBtn = document.querySelector('.search__btn');
const buttonsContainer = document.querySelector('.pagination');

class searchView extends View {
  _errorMessage = 'No recipes found for your search. Please try again!';
  _parentElement = document.querySelector('.results');

  prevPage = 0;
  nextPage = 1;
  resultsPerPage = 10; //Risultati per pagina
  pages;

  addHandlerResults(handler) {
    searchBtn.addEventListener('click', function (e) {
      e.preventDefault();

      handler();
    });
  }

  getPagesNumber(results) {
    this.pages = Math.ceil(results.length / this.resultsPerPage); //Per sapere fino a che numero mostrare btnNext
  }

  getResults() {
    //Set parameters to beginning state
    resultsContainer.innerHTML = '';
    buttonsContainer.innerHTML = '';
    this.prevPage = 0;
    this.nextPage = 1;
    const userSearch = userInput.value; //take user input
    userInput.value = '';

    return userSearch;
  }

  getResultsPerPage(results) {
    const results10 = results.slice(
      +(this.prevPage + '0'),
      +(this.nextPage + '0')
    );
    this.showResults(results10);
  }

  prev(e) {
    this.prevPage--;
    this.nextPage--;

    resultsContainer.innerHTML = '';
    buttonsContainer.innerHTML = '';

    this.getResultsPerPage(this._data);
  }

  next(e) {
    this.prevPage++;
    this.nextPage++;

    resultsContainer.innerHTML = '';
    buttonsContainer.innerHTML = '';

    this.getResultsPerPage(this._data);
  }

  changePage() {
    if (this.prevPage === 0) {
      document.querySelector('.pagination__btn--prev').style.display = 'none';
    } else {
      document
        .querySelector('.pagination__btn--prev')
        .addEventListener('click', this.prev.bind(this));
    }

    if (this.nextPage === this.pages) {
      document.querySelector('.pagination__btn--next').style.display = 'none';
    } else {
      document
        .querySelector('.pagination__btn--next')
        .addEventListener('click', this.next.bind(this));
    }
  }

  showResults(results) {
    results.forEach(function (recipe) {
      const html = `
  <li class="preview">
  <a class="preview__link" data-id="${recipe.id}" href="${recipe.id}">
     <figure class="preview__fig">
       <img src="${recipe.image_url}" alt="Test" />
     </figure>
     <div class="preview__data">
       <h4 class="preview__title">${recipe.title}</h4>
       <p class="preview__publisher">${recipe.publisher}</p>
       
       <div class="preview__user-generated ${recipe.key ? '' : 'hidden'}">
         <svg>
          <use href="${icons}#icon-user"></use>
         </svg>
      </div>

     </div>
   </a>
  </li>
  `;
      resultsContainer.insertAdjacentHTML('beforeend', html);
    });

    const buttonPrev = ` <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${this.prevPage}</span>
          </button>`;

    const buttonNext = `  <button class="btn--inline pagination__btn--next">
          <span>${this.nextPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;

    buttonsContainer.insertAdjacentHTML('afterbegin', buttonPrev);
    buttonsContainer.insertAdjacentHTML('afterbegin', buttonNext);

    this.changePage();
  }
}

export default new searchView();
