import {
        cardTemplate,
        imagePopup,
        imageCapture,
        popupImage
      } from "./constants.js";

//open&close
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEscPopup);
}

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEscPopup);
}

//EDIT POPUP and Submit
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEdit);
}

//Resetting Values
function resetInput() {
  popupInputs.forEach((item) => (item.value = ""));
}

//adding 6 cards from array + listeners

const  createCard = (name, link) => {
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

export {
  openPopup,
  closeEscPopup,
  closePopup,
  submitProfileForm,
  resetInput,
  createCard,
};
