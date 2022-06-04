import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    this._data = data;
  }

  showError(message = this._errorMessage) {
    this._parentElement.textContent = '';

    console.log(message);

    const html = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;

    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
