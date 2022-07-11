import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitProfileForm }) {
    super(popupSelector);
    this._submitProfileForm = submitProfileForm;
    this._formEdit = this._popup.querySelector(".popup__form");
    this._buttonSave = this._formEdit.querySelector(".popup__button");
    this._inputList = this._formEdit.querySelectorAll(".popup__input");
  }

  //сббор данных из полей формы
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEdit.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitProfileForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formEdit.reset();
  }

  renderLoading(isLoad) {
    if (isLoad) {
      this._buttonSave.textContent = "Сохранение...";
    } else {
      this._buttonSave.textContent = "Сохранить";
    }
  }
}
