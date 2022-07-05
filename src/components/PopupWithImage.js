import Popup from "./popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector(".popup__image");
    this._namePopup = this._popup.querySelector(".popup__image-capture");
  }
  //метод открытия попапа
  open(capture, link) {
    this._namePopup.textContent = capture;
    this._imagePopup.src = link;
    this._imagePopup.alt = capture;
    super.open();
  }
  //сделали метод закрытия - чтобы во время загрузки нового изображения не было предыдущего
  close() {
    this._namePopup.textContent = "#";
    this._imagePopup.src = "#";
    this._imagePopup.alt = "#";
    super.close();
  }
}
