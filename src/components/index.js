import "../pages/index.css";

//import of constants

import {
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
  popupReset,
  formEdit,
  buttonElementAdd,
  inactiveButtonClassAdd,
  formElementAddCard,
  editAvatarBtn,
  editAvatarBtnActive,
  popupAvatar,
  avatarForm,
} from "./constants.js";

//import of functions

import { enableValidation, toggleButtonState } from "./validate.js";

import { like, deleteCardFromDom } from "./card.js";

import {
  openPopup,
  closePopup,
  submitProfileForm,
  handlePlaceFormSubmit,
  handleAvatarFormSubmit,
  showEditBtn,
  hiddenEditBtn,
} from "./modal.js";

import { getUserInfo, getCards, likeCard, deleteCard } from "./api.js";
import { updateUserInfo, renderItems } from "../utils/utils.js";

//Listener open&close

//EDIT POPUP and Submit

//Listener EDIT PROFILE POPUP and Submit
buttonEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

formProfileElement.addEventListener("submit", submitProfileForm);

//Card adding

buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});



popupAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handlePlaceFormSubmit(
    evt,
    formElementAddCard,
    linkSubmit.value,
    nameSubmit.value
  );

  
  popupReset.reset();
  toggleButtonState(formEdit, buttonElementAdd, inactiveButtonClassAdd);
});

//AVATAR Listeners

editAvatarBtn.addEventListener("mouseover", () => {
  showEditBtn(editAvatarBtnActive);
});

editAvatarBtn.addEventListener("mouseout", () => {
  hiddenEditBtn(editAvatarBtnActive);
});

editAvatarBtn.addEventListener("click", () => {
  openPopup(popupAvatar);
  avatarForm.reset();
  toggleButtonState(formEdit, buttonElementAdd, inactiveButtonClassAdd);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  toggleButtonState(formEdit, buttonElementAdd, inactiveButtonClassAdd);
  handleAvatarFormSubmit(evt, avatarForm);
});

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    updateUserInfo(userData, cardsData);
    renderItems(userData, cardsData);
  })
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен:", err);
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
