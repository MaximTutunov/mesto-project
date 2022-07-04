export default class FormValidator{
    constructor(config, formIndividual){
        this._config = config;
        this._formIndividual = formIndividual;
        this._inputList = Array.from(this._formIndividual.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formIndividual.querySelector(this._config.submitButtonSelector);
    }

    //показываем валидацию
     _displayInputError (inputElement, validationMessage) {
        const errorElement = this._formIndividual.querySelector(`#${inputElement.id}-error`);
        console.log(errorElement);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent =  validationMessage;
      };

      //убираем валидацию
      _hideInputError(inputElement){
        const errorElement = this._formIndividual.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = "";
      }

      //проверяем инпуты и показываем либо прячем валидацию
      _checkInputValidity(inputElement){
        if (inputElement.validity.valid) {
          this._hideInputError(inputElement, inputElement.validationMessage);
        } else {
          this._displayInputError(inputElement);
        }
      };

      //если хотя бы в одном импуте ошибка возвращаем false в параметр валидации validity.valid
      _hasInvalidInput(){
        return this._inputList.some((inputItem) => {
          return !inputItem.validity.valid;
        });
      };

      //убираем или добавляем модификаторы кнопки, а также параметр disabled в зависимости от проверки
      toggleButtonState(){
       if (this._hasInvalidInput()){
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
       } else {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
       }}

       //функция, которая будет отслеживать валидацию при введении данных
       _setEventListeners(){
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
            this.toggleButtonState();
          });
        });

      };
      
      //функция включения валидации
      enableValidation() {
        this._setEventListeners();
      }
    }