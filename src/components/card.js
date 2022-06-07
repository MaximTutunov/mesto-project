import {
  cardTemplate,
  imagePopup,
  imageCapture,
  popupImage,
  } from "./constants.js";

  import { openPopup} from "./modal.js";

//adding 6 cards from array + listeners

const createCard = (name, link) => {
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
      classListToggle (evt);
    });

  cardElement
    .querySelector(".gallery__button-del")
    .addEventListener("click", function (evt) {
      evt.target.closest(".gallery__item").remove();
    });

  
  cardImage.addEventListener("click", () => {
    openPopupImage(link, name);
  });

  return cardElement;
};

function openPopupImage(imageLink, header) {
  imagePopup.setAttribute("src", imageLink);
  imagePopup.setAttribute("alt", header);
  imageCapture.textContent = header;
  openPopup(popupImage);
}

function classListToggle (evt) {evt.target.classList.toggle("gallery__button-liked")};



export {createCard };
