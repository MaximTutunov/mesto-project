const popupEdit = document.querySelector(".popup_edit");
const buttonEdit = document.querySelector(".profile__button-edit");

const buttonAdd = document.querySelector(".profile__button-add");

const popupAdd = document.querySelector(".popup_add");

const nameSubmit = popupAdd.querySelector("#add-card-title");
const linkSubmit = popupAdd.querySelector("#add-card-link");
const formElementAddCard = popupAdd.querySelector('#add-form');

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const profileAvatar =document.querySelector('.profile__avatar');

const editAvatarBtn = document.querySelector('.profile__edit-avatar');
const editAvatarBtnActive = document.querySelector('.profile__change-avatar')
const popupAvatar = document.querySelector('#popup-avatar-edit');
const avatarForm = popupAvatar.querySelector('#popup-avatar-form')
const avatarInput = avatarForm.querySelector('#add-avatar-link');
const popupSaveAvatarButton = popupAvatar.querySelector('#popup-avatar_save-button');

const formProfileElement = popupEdit.querySelector(".popup__form");



const nameInput = popupEdit.querySelector("#name");
const professionInput = popupEdit.querySelector("#description");

const buttonSave = document.querySelector(".popup__button");
const popupsCloseButtons = document.querySelectorAll(".popup__button-close");

const popupsAll = Array.from(document.querySelectorAll(".popup"));

// template

const cardTemplate = document.querySelector(".gallery__template").content;
const cardsContainer = document.querySelector(".gallery__container");

const popupImage = document.querySelector(".popup_enlarged-image");

//for resetting
const popupInputs = popupAdd.querySelectorAll(".popup__input-text");
const popupReset = popupAdd.querySelector(".popup__form");

//for blocking empty sending after successful submit 
const submitButtonSelectorAdd = "#add-button";
const formEdit = document.querySelector("#add-form");
const buttonElementAdd = formEdit.querySelector(submitButtonSelectorAdd);
const inactiveButtonClassAdd = "popup__button_disabled";

//Opening large image

const imagePopup = popupImage.querySelector(".popup__image");
const imageCapture = popupImage.querySelector(".popup__image-capture");


export {
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
  submitButtonSelectorAdd,
  formEdit,
  buttonElementAdd,
  inactiveButtonClassAdd,
  profileAvatar,
  formElementAddCard,
  editAvatarBtn,
  editAvatarBtnActive,
  popupAvatar,
  avatarForm,
  avatarInput,
  popupSaveAvatarButton
  };
