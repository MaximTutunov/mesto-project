import "../pages/index.css";

//import of constants

import {
  initialCards,
  popupEdit,
  buttonEdit,
  buttonAdd,
  popupAdd,
  nameSubmit,
  linkSubmit,
  profileName,
  profileProfession,
  formProfileElement,
  nameInput,
  professionInput,
  popupsCloseButtons,
  popupsAll,
  cardsContainer,
  popupInputs,
  popupReset,
  formEdit,
  buttonElementAdd,
  inactiveButtonClassAdd
} from "./constants.js";

//import of functions

import { enableValidation, toggleButtonState } from "./validate.js";

import { createCard } from "./card.js";

import { openPopup, closePopup } from "./modal.js";

//Listener open&close

buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

//EDIT POPUP and Submit
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEdit);
}

//Listener EDIT POPUP and Submit
buttonEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

formProfileElement.addEventListener("submit", submitProfileForm);

//adding 6 cards from array + listeners

initialCards.forEach((item) =>
  cardsContainer.append(createCard(item.name, item.link))
);

//Listenercreating and submitting card


popupAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardsContainer.prepend(createCard(nameSubmit.value, linkSubmit.value));
  closePopup(popupAdd);
  popupReset.reset();
  toggleButtonState(formEdit, buttonElementAdd, inactiveButtonClassAdd);
});

// enabling validation

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
