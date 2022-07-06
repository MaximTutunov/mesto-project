export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(containerSelector);
  }

  renderItems(cards) {
    cards.forEach((card) => this._renderer(card));
  }

  addItem(cardElement) {
    this._cardsContainer.prepend(cardElement);
  }
}
