//Function Validation
// Errors Display
const displayInputError = (inputElement, { inputErrorClass, errorClass }) => {
    const errorElement = inputElement
      .closest(".popup__form")
      .querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
  
  //Errors hide
  const hideInputError = (formIndividual, inputElement, subConfig) => {
    const { inputErrorClass, errorClass } = subConfig;
    const errorElement = formIndividual.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };
  
  //check for form validity
  
  const checkInputValidity = (formIndividual, inputElement, subConfig) => {
    if (inputElement.validity.valid) {
      hideInputError(formIndividual, inputElement, subConfig);
    } else {
      displayInputError(inputElement, subConfig);
    }
  };
  
  //button toggling
  
  const toggleButtonState = (
    formIndividual,
    buttonElement,
    inactiveButtonClass
  ) => {
    const isFormValid = formIndividual.checkValidity();
    buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
    buttonElement.disabled = !isFormValid;
  };
  
  // setting Listeners
  
  const setEventListeners = (formIndividual, subConfig) => {
    const {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      errorClass,
      inputErrorClass,
    } = subConfig;
    const inputList = Array.from(formIndividual.querySelectorAll(inputSelector));
  
    const buttonElement = formIndividual.querySelector(submitButtonSelector);
    toggleButtonState(formIndividual, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formIndividual, inputElement, {
          inputErrorClass,
          errorClass,
        });
  
        toggleButtonState(formIndividual, buttonElement, inactiveButtonClass);
      });
    });
  };
  
  //enabling Validation on Submit
  
  const enableValidation = (subConfig) => {
    const { formSelector, ...restProps } = subConfig;
    const formsAll = Array.from(document.querySelectorAll(formSelector));
  
    formsAll.forEach((form) => {
      form.addEventListener("submit", (evt) => evt.preventDefault());
  
      setEventListeners(form, restProps);
    });
  };

  export {enableValidation}