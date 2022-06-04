import View from './view';

class servingsView extends View {
  addHandlerUpdateServings(handler) {
    document.querySelector('.recipe').addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');

      if (!btn) return;

      const moreServings = e.target.closest('.btn--increase-servings');
      const lessServings = e.target.closest('.btn--decrease-servings');

      if (moreServings) {
        handler(moreServings);
      } else if (lessServings) {
        handler(lessServings);
      }
    });
  }
}

export default new servingsView();
