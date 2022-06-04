const KEY = '2b01fd59-8033-4e3b-a829-b828a3bf40ff';

export const state = {
  results: [],
  recipe: {},
  bookmark: [],
};

export const loadResults = async function (searchedFood) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchedFood}&key=${KEY}`
    );

    const responseData = await response.json();

    state.results = responseData.data.recipes;

    return state.results;
  } catch (err) {
    throw err;
  }
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${KEY}`
    );

    const responseData = await response.json();

    state.recipe = responseData.data.recipe;

    if (state.bookmark.some(recipe => recipe.id === id)) {
      state.recipe.isBookmarked = true;
    } else {
      state.recipe.isBookmarked = false;
    }

    return state.recipe;
  } catch (err) {
    throw err;
  }
};

export const updateServings = function (btn) {
  if (btn.classList.contains('btn--increase-servings')) {
    const oldServings = state.recipe.servings;

    state.recipe.servings++;

    state.recipe.ingredients.forEach(function (ing) {
      ing.quantity = (ing.quantity * state.recipe.servings) / oldServings;
    });
  } else if (btn.classList.contains('btn--decrease-servings')) {
    const oldServings = state.recipe.servings;

    state.recipe.servings === 1
      ? (state.recipe.servings = 1)
      : state.recipe.servings--;

    state.recipe.ingredients.forEach(function (ing) {
      ing.quantity = (ing.quantity * state.recipe.servings) / oldServings;
    });
  }
};

export const getNewRecipeData = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(function (ing) {
        return ing[0].startsWith('ingredient') && ing[1] !== '';
      })
      .map(function (ing) {
        const ingredient = ing[1].split(',');

        if (ingredient.length !== 3) {
          alert(
            'You used the wrong format methods, look at the example and try again'
          );
        }

        const [quantity, unit, description] = ingredient;

        return {
          quantity: quantity === '' ? null : quantity,
          unit: unit,
          description: description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    state.recipe.key = KEY;

    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/?key=${KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      }
    );

    const data = await response.json();

    state.recipe = data.data.recipe;

    state.recipe.isBookmarked = true;

    document.querySelector('.add-recipe-window').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');

    return data.data.recipe;
  } catch (err) {
    throw err;
  }
};

export const renderBookmark = function (showRecipe, bookmarkedRecipes) {
  document
    .querySelector('.bookmarks__list')
    .addEventListener('click', function (e) {
      e.preventDefault();

      const click = e.target.closest('.preview__link');
      const id = click.dataset.id;

      const recipe = bookmarkedRecipes.find(function (recipe) {
        return recipe.id === id;
      });

      window.history.pushState(null, '', `#${recipe.id}`);

      state.recipe = recipe;

      showRecipe(recipe);
    });
};

export const setBookmarkTrue = function () {
  state.recipe.isBookmarked = true;
};

export const setBookmarkFalse = function () {
  state.recipe.isBookmarked = false;
};

export const setLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};
