import "../pages/index.css";
import Section from "./section.js";
import Card from "./card";
import {  config, Api} from "../components/api.js";
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

import { getCards, likeCard, deleteCard } from "./api.js";
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




//создаем кард
function createItem(
  placeLinkValue,
  placeDescriptionValue,
  likes,
  myId,
  cardOwnerID,
  cardID,
  likesOwnerID
) {
  const card = new Card(
    placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID,

    {
      handleCardClick: (imageLink, header) => {
        openPopupImage(imageLink, header);
      },
    },
    {
      likeHandler: (evt, cardID, likeCount) => {
        let method = "";
        if (evt.target.classList.contains("gallery__button-liked")) {
          method = "DELETE";
        } else {
          method = "PUT";
        }
        api
          .likeCard(cardID, method)
          .then((data) => {
            card.like(evt, likeCount, data);
          })
          .catch((err) => {
            console.log("Ошибка. Запрос не выполнен: из индекс", err);
          });
      },
    },
    {
      deleteHandler: (event, cardID) => {
        api
          .deleteCard(cardID)
          .then(() => {
            card.deleteCardFromDom(event);
          })
          .catch((err) => {
            console.log("Ошибка. Запрос не выполнен: ", err);
          });
      },
    }
  );

  const cardElement = card.createCard(
    placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID
  );

  return cardElement;
  
}

 //создаём экземпляр класса Api
 const api = new Api (config);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cardsData]) => {
    updateUserInfo(userData, cardsData);
    cardsRenders.renderItems(cardsData);
  })
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен:", err);
  });

 
// Создание экземпляра класса Section
const cardsRenders = new Section({
  renderer: (placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID) => {
    cardsRenders.addItem(createItem(
      placeLinkValue,
      placeDescriptionValue,
      likes,
      myId,
      cardOwnerID,
      cardID,
      likesOwnerID
    ));
  },
}, '.gallery__container');

const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createItem(card));
  },
}, '.somph');
// enabling validation

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
