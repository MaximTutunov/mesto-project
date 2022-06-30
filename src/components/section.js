export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this.cardsContainer = document.querySelector(containerSelector);
    }
    renderItems(data) {
        data.forEach(item => this._renderer(item));
    }

    addItem(cardElement) {
        this.cardsContainer.prepend(cardElement);
    }
}