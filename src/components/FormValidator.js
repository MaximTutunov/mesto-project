export default class FormValidator{
    constructor(){
        this._api = api;
        this._formIndividual = _formIndividual;
        this._buttonElement = this._formIndividual.querySelector(this._api.submitButtonSelector)ö
    }

    //показываем валидацию
     _displayInputError (inputElement, validationMessage ) {
        const errorElement = this._inputElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._api.inputErrorClass);
        errorElement.classList.add(this._api.errorClass);
        errorElement.textContent = validationMessage;
      };

      //убираем валидацию
      _hideInputError(inputElement, subConfig){
        const errorElement = this._formIndividual.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._api.inputErrorClass);
        errorElement.classList.remove(this._api.errorClass);
        errorElement.textContent = "";
      }

      //проверяем инпуты и показываем либо прячем валидацию
      _checkInputValidity(formIndividual, inputElement){
        if (inputElement.validity.valid) {
          this._hideInputError(formIndividual, inputElement.validationMessage);
        } else {
          this._displayInputError(inputElement);
        }
      };

      //если хотя бы в одном импуте ошибка возвращаем false в параметр валидации validity.valid
      _hasInvalidInput(formIndividuals){
        return formIndividuals.some((formIndividual) => {
          return !formIndividual.validity.valid;
        });
      };

      //убираем или добавляем модификаторы кнопки, а также параметр disabled в зависимости от проверки
      _toggleButtonState(){
       if (this._hasInvalidInput()){
        this._buttonElement.classList.add(this._api.inactiveButtonClass);
        buttonElement.disabled = true;
       } else {
        buttonElement.classList.remove(this._api.inactiveButtonClass);
        buttonElement.disabled = false;
       }}

       //функция, которая будет отслеживать валидацию при введении данных
       _setEventListeners(formIndividual){
        const inputList = Array.from(this._formIndividual.querySelectorAll(this._api.inputSelector));
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this._checkInputValidity(formIndividual);
            this._toggleButtonState();
          });
        });
      };

    }