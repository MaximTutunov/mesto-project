import '../pages/index.css'

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
  buttonSave,
  popupsCloseButtons,
  popupsAll,
  cardTemplate,
  cardsContainer,
  popupImage,
  popupInputs,
  imagePopup,
  imageCapture,
} from "./constants.js";

//import of functions

import { enableValidation } from "./validate.js";

import {
  openPopup,
  closeEscPopup,
  closePopup,
  submitProfileForm,
  resetInput,
  createCard, 
} from "./card.js";

//open&close

buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

popupsCloseButtons.forEach((close) =>
  close.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  })
);

//close popup on overlay clicking

popupsAll.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

//EDIT POPUP and Submit
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

//creating and submitting card*/

popupAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardsContainer.prepend(createCard(nameSubmit.value, linkSubmit.value));
  closePopup(popupAdd);
  resetInput();
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
