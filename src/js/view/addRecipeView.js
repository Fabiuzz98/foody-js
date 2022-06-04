import View from './view';

class addRecipe extends View {
  _errorMessage = 'There was a problem creating the new recipe';
  _parentElement = document.querySelector('.recipe');

  constructor() {
    super();
    this.showWindow();
    this.closeWindow();
  }

  showWindow() {
    document
      .querySelector('.nav__btn--add-recipe')
      .addEventListener('click', function () {
        document.querySelector('.add-recipe-window').classList.toggle('hidden');
        document.querySelector('.overlay').classList.toggle('hidden');
      });
  }

  closeWindow() {
    document
      .querySelector('.btn--close-modal')
      .addEventListener('click', function () {
        document.querySelector('.add-recipe-window').classList.toggle('hidden');
        document.querySelector('.overlay').classList.toggle('hidden');
      });

    document.querySelector('.overlay').addEventListener('click', function () {
      document.querySelector('.add-recipe-window').classList.toggle('hidden');
      document.querySelector('.overlay').classList.toggle('hidden');
    });
  }

  addHandlerNewRecipe(handler) {
    document
      .querySelector('.upload__btn')
      .addEventListener('click', function (e) {
        e.preventDefault();
        const recipeData = [...new FormData(document.querySelector('.upload'))];

        const newRecipe = Object.fromEntries(recipeData);

        document.querySelector('.add-recipe-window').classList.add('hidden');
        document.querySelector('.overlay').classList.add('hidden');

        handler(newRecipe);
      });
  }
}

export default new addRecipe();
