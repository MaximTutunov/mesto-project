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
  profileAvatar
} from "./constants.js";

//import of functions

import { enableValidation, toggleButtonState } from "./validate.js";

import { addPrependCard } from "./card.js";

import {
  openPopup,
  closePopup,
  submitProfileForm,
  handlePlaceFormSubmit,
  handleAvatarFormSubmit,
  showEditBtn,
  hiddenEditBtn,
} from "./modal.js";

import { getUserInfo, getCards,  } from "./api.js";

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
  
  
  closePopup(popupAdd);
  popupReset.reset();
  toggleButtonState(formEdit, buttonElementAdd, inactiveButtonClassAdd);
});

//AVATAR Listeners

editAvatarBtn.addEventListener('mouseover', ()=>{
  showEditBtn(editAvatarBtnActive)
})

editAvatarBtn.addEventListener('mouseout', () => {
  hiddenEditBtn(editAvatarBtnActive)})

  editAvatarBtn.addEventListener('click', ()=>{
    openPopup(popupAvatar);
    avatarForm.reset();
    toggleButtonState(formEdit, buttonElementAdd, inactiveButtonClassAdd);
  });

avatarForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  toggleButtonState(formEdit, buttonElementAdd, inactiveButtonClassAdd);
  handleAvatarFormSubmit(evt, avatarForm)
})




Promise.all([getUserInfo(), getCards()]).then(([userData, cardsData]) => {
  profileName.textContent = userData.name;
  profileProfession.textContent = userData.about;
  profileAvatar.src = userData.avatar;

  for (let i = 0; i < cardsData.length; i++) {

    const like = cardsData[i].likes;
    const cardOwnerID= cardsData[i].owner._id;
    const cardID=cardsData[i]._id;
    const likesOwnerID = [];
    
    like.forEach(element => {
      likesOwnerID.push(element._id);
    })


    addPrependCard(cardsData[i].link, cardsData[i].name, like.length, userData._id, cardOwnerID,
      cardID, likesOwnerID);
    
  }
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


