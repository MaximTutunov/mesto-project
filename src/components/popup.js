export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._poup.querySelector(".popup__button-close");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeEscPopup);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.addEventListener("keydown", this._closeEscPopup);
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeBtn.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
