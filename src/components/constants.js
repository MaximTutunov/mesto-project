const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupEdit = document.querySelector(".popup_edit");
const buttonEdit = document.querySelector(".profile__button-edit");

const buttonAdd = document.querySelector(".profile__button-add");

const popupAdd = document.querySelector(".popup_add");

const nameSubmit = popupAdd.querySelector("#add-card-title");
const linkSubmit = popupAdd.querySelector("#add-card-link");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const formProfileElement = popupEdit.querySelector(".popup__form");

const nameInput = popupEdit.querySelector("#name");
const professionInput = popupEdit.querySelector("#description");

const buttonSave = document.querySelector(".popup__button");
const popupsCloseButtons = document.querySelectorAll(".popup__button-close");

const popupsAll = Array.from(document.querySelectorAll(".popup"));

// 6 cards from array

const cardTemplate = document.querySelector(".gallery__template").content;
const cardsContainer = document.querySelector(".gallery__container");

const popupImage = document.querySelector(".popup_enlarged-image");

//for resetting
const popupInputs = popupAdd.querySelectorAll(".popup__input-text");
const popupReset = popupAdd.querySelector(".popup__form");

//Opening large image

const imagePopup = popupImage.querySelector(".popup__image");
const imageCapture = popupImage.querySelector(".popup__image-capture");


export {
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
  popupReset,
  
};
