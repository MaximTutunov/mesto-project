import "../pages/index.css";
import Section from "./section.js";
import Card from "./card";
import Api from "./api.js";

import Popup from "./popup.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
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

// import { like, deleteCardFromDom } from "./card.js";

import {
  openPopup,
  // closePopup,
  submitProfileForm,
  // handlePlaceFormSubmit,
  handleAvatarFormSubmit,
  showEditBtn,
  hiddenEditBtn,
} from "./modal.js";

import { updateUserInfo, renderItems } from "../utils/utils.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-10/",
  headers: {
    Authorization: "8c303db7-8ccc-4a68-8cf0-1a3320479a6d",
    "Content-type": "application/json",
  },
});

let userId;

//вызываем промисы, отрисовываем карточки и добавляем инфо о пользователе
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cardsData]) => {
    updateUserInfo(userData, cardsData);
    userId = userData._id;
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен:", err);
  });


// Создание экземпляра класса Section
const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.gallery__container');


// функционал создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: '.gallery__template',
    userId: userId,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    deleteHandler: (cardID) => {
        api.deleteCard(cardID)
          .then(() => {
            card.deleteCardFromDom();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
    },
    setLike: (cardID) => {
      api.setLike(cardID)
        .then((data) => {
          card.likeSwitcher(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    deleteLike: (cardID) => {
      api.deleteLike(cardID)
        .then((data) => {
          card.likeSwitcher(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });
  const cardElement = card.createCard();
  return cardElement;
};


const  handlePlaceFormSubmit = new PopupWithForm({
  popupSelector: '.popup_add',
  submitProfileForm: (popupData) => {
    handlePlaceFormSubmit.renderLoading(true);
    api.addCard(popupData)
      .then((popupData) => {
        cardsList.addItem(createCard(popupData));
        handlePlaceFormSubmit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        handlePlaceFormSubmit.renderLoading(false);
      });
  }
});
handlePlaceFormSubmit.setEventListeners();
buttonAdd.addEventListener("click", () => {
  handlePlaceFormSubmit.open();
});

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



// popupAdd.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   handlePlaceFormSubmit(
//     evt,
//     formElementAddCard,
//     linkSubmit.value,
//     nameSubmit.value
//   );

//   popupReset.reset();
//   toggleButtonState(formEdit, buttonElementAdd, inactiveButtonClassAdd);
// });

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



// enabling validation

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});



//попап с картинкой
const popupImage = new PopupWithImage('.popup_enlarged-image');
popupImage.setEventListeners();
