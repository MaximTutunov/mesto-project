//edit 
/*import {initialCards} from './constants.js';*/



const popupEdit = document.querySelector(".popup_edit");
const buttonEdit = document.querySelector(".profile__button-edit");

const buttonAdd = document.querySelector(".profile__button-add");

const popupAdd = document.querySelector(".popup_add");

const nameSubmit = popupAdd.querySelector("#place");
const linkSubmit = popupAdd.querySelector("#link");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const formProfileElement = popupEdit.querySelector(".popup__form");

const nameInput = popupEdit.querySelector("#name");
const professionInput = popupEdit.querySelector("#profession");

const buttonSave = document.querySelector(".popup__button-save");
const popupsCloseButtons = document.querySelectorAll(".popup__button-close");
// 6 cards from array

const cardTemplate = document.querySelector(".gallery__template").content;
const cardsContainer = document.querySelector(".gallery__container");

const popupImage = document.querySelector(".popup_enlarged-image");

//for resetting
const popupInputs = popupAdd.querySelectorAll(".popup__form-text");



//Opening large image

const imagePopup = popupImage.querySelector(".popup__image");
const imageCapture = popupImage.querySelector(".popup__image-capture");



//FUNCTIONS

//open&close
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}
popupsCloseButtons.forEach((close) =>
  close.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  })
);

//EDIT POPUP and Submit
buttonEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEdit);
}

formProfileElement.addEventListener("submit", submitProfileForm);

//adding 6 cards from array + listeners

initialCards.forEach((item) =>
  cardsContainer.append(createCard(item.name, item.link))
);

function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".gallery__photo");
  cardElement.querySelector(".gallery__caption").textContent = name;
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);

  cardElement
    .querySelector(".gallery__button-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__button-liked");
          });

  cardElement
    .querySelector(".gallery__button-del")
    .addEventListener("click", function (evt) {
      evt.target.closest(".gallery__item").remove();
    });

  function openPopupImage(imageLink, header) {
    imagePopup.setAttribute("src", imageLink);
    imagePopup.setAttribute("alt", header);
    imageCapture.textContent = header;
    openPopup(popupImage);
  }
  cardImage.addEventListener("click", () => {
    openPopupImage(link, name);
  });

  return cardElement;
}

//Resetting Values
function resetInput() {
  popupInputs.forEach((item) => (item.value = ""));
}


//creating and submitting card*/

popupAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardsContainer.prepend(createCard(nameSubmit.value, linkSubmit.value));
  closePopup(popupAdd);
  resetInput();
});
