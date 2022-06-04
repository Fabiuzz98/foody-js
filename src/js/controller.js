// https://forkify-api.herokuapp.com/v2

import * as model from './model';
import searchView from './view/searchView';
import recipeView from './view/recipeView';
import servingsView from './view/servingsView';
import addRecipeView from './view/addRecipeView';
import bookmarkView from './view/bookmarkView';

///////////////////////////////////////

const retrieveStorage = function () {
  const storage = localStorage.getItem('bookmarks');
  let savedBookmarks = JSON.parse(storage);

  if (!savedBookmarks) return;

  model.state.bookmark = savedBookmarks;

  bookmarkView.addBookmark(model.state.bookmark);
  model.renderBookmark(recipeView.showRecipe, model.state.bookmark);
};

retrieveStorage();

const controlResults = async function () {
  try {
    const foodSearched = searchView.getResults();
    const results = await model.loadResults(foodSearched);
    if (results.length === 0) {
      searchView.showError();
    }

    searchView.render(results);

    searchView.getPagesNumber(results);

    searchView.getResultsPerPage(results);
  } catch (err) {
    console.log(err);
    searchView.showError(err);
  }
};
searchView.addHandlerResults(controlResults);

////////////////////////////////////////////////////////////////

const controlRecipe = async function (id) {
  try {
    const recipe = await model.loadRecipe(id);

    recipeView.render(recipe);

    recipeView.showRecipe(recipe);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.log(err);
    recipeView.showError(err);
  }
};
recipeView.addHandlerRecipe(controlRecipe);

////////////////////////////////////////////////////////////////

const controlServings = function (btn) {
  model.updateServings(btn);

  recipeView.showRecipe(model.state.recipe);
};
servingsView.addHandlerUpdateServings(controlServings);

////////////////////////////////////////////////////////////////

const controlNewRecipe = async function (newRecipe) {
  try {
    const bookmarkRecipe = await model.getNewRecipeData(newRecipe);

    recipeView.showRecipe(model.state.recipe);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    model.state.bookmark.unshift(bookmarkRecipe);

    bookmarkView.addBookmark(model.state.bookmark);

    model.setLocalStorage();

    model.renderBookmark(recipeView.showRecipe, model.state.bookmark);
  } catch (err) {
    console.log(err);
    recipeView.showError(err);
  }
};
addRecipeView.addHandlerNewRecipe(controlNewRecipe);

////////////////////////////////////////////////////////////////

const controlBookmark = function () {
  if (!model.state.recipe.isBookmarked) {
    model.setBookmarkTrue();

    recipeView.showRecipe(model.state.recipe);

    model.state.bookmark.unshift(model.state.recipe);

    bookmarkView.addBookmark(model.state.bookmark);

    model.setLocalStorage();

    model.renderBookmark(recipeView.showRecipe, model.state.bookmark);
  } else {
    model.setBookmarkFalse();

    bookmarkView.deleteBookmarkedRecipe(model.state.bookmark);

    model.setLocalStorage();

    bookmarkView.addBookmark(model.state.bookmark);

    recipeView.showRecipe(model.state.recipe);
  }
};
bookmarkView.addHandlerBookmark(controlBookmark);
