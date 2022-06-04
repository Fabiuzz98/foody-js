import icons from 'url:../../img/icons.svg';
import View from './view';
const bookmarkContainer = document.querySelector('.bookmarks__list');

class bookmarkView extends View {
  addHandlerBookmark(handler) {
    document.querySelector('.recipe').addEventListener('click', function (e) {
      const bookmarkBtn = e.target.closest('.btn--round');

      if (!bookmarkBtn) return;

      handler();
    });
  }

  addBookmark(bookmarkedRecipes) {
    document.querySelector('.bookmarks__list').textContent = '';

    bookmarkedRecipes.forEach(function (recipe) {
      const html = `
                        <li class="preview__link">
                          <a class="preview__link" data-id="${recipe.id}" href="#${recipe.id}">
                            <figure class="preview__fig">
                              <img src="${recipe.image_url}" alt="${recipe.title}" />
                            </figure>
                            <div class="preview__data">
                              <h4 class="preview__title">
                              ${recipe.title}
                              </h4>
                              <p class="preview__publisher">${recipe.publisher}</p>
                            </div>
                          </a>
                        </li>`;

      bookmarkContainer.insertAdjacentHTML('afterbegin', html);
    });

    if (bookmarkedRecipes.length === 0) {
      const html = `
                 <div class="message">
                    <div>
                      <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                 </div>`;

      bookmarkContainer.insertAdjacentHTML('afterbegin', html);
    }
  }

  deleteBookmarkedRecipe(bookmarkedRecipes) {
    const id = window.location.hash.slice(1);
    const index = bookmarkedRecipes.findIndex(function (recipe) {
      return recipe.id === id;
    });

    bookmarkedRecipes.splice(index, 1);
  }
}

export default new bookmarkView();
