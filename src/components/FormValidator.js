export default class FormValidator{
    constructor(){
        this._api = api;

    }
    //показываем валидацию
     _displayInputError = (
        inputElement,
        { inputErrorClass, errorClass, formSelector }
      ) => {
        const errorElement = this._inputElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._api.inputErrorClass);
        errorElement.classList.add(this._api.errorClass);
        errorElement.textContent = this._inputElement.validationMessage;
      };
}