import Popup from './popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._imagePopup = this._popup.querySelector('.popup__image');
        this._imageCapture = this._popup.querySelector('.popup__image-capture');
    }

    open (link, capture) {
        this._namePopup.textContent = capture;
        this._imagePopup.src = link;
        this._imagePopup.alt = capture;
        super.open();
    }
}