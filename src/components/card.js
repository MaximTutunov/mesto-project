import {
  cardTemplate,
  imagePopup,
  imageCapture,
  popupImage,
  cardsContainer,
} from "./constants.js";

import { openPopup } from "./modal.js";

import { deleteHandler, likeHandler } from "./index.js";

function like(evt, likeShow, data) {
  evt.target.classList.toggle("gallery__button-liked");
  likeShow.textContent = data.likes.length;
}

function deleteCardFromDom(event) {
  const target = event.target;
  target.closest(".gallery__item").remove();
}

const createCard = (
  placeLinkValue,
  placeDescriptionValue,
  likes,
  myId,
  cardOwnerID,
  cardID,
  likesOwnerID
) => {
  const cardElement = cardTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".gallery__photo");
  const likeCount = cardElement.querySelector(".gallery__likes-counter");
  likeCount.textContent = `${likes}`;
  const deleteButton = cardElement.querySelector(".gallery__button-del");
  const likeButton = cardElement.querySelector(".gallery__button-like");
  cardElement.querySelector(".gallery__caption").textContent =
    placeDescriptionValue;
  cardImage.setAttribute("src", placeLinkValue);
  cardImage.setAttribute("alt", placeDescriptionValue);

  // setting LIKES
  if (likesOwnerID.includes(myId)) {
    likeButton.classList.add("gallery__button-liked");
  }

  likeButton.addEventListener("click", function (evt) {
    likeHandler(evt, cardID, likeCount);
  });

  ///delete
  if (myId === cardOwnerID) {
    deleteButton.addEventListener("click", function (event) {
      deleteHandler(event, cardID);
    });
  } else {
    deleteButton.remove();
  }

  cardImage.addEventListener("click", () => {
    openPopupImage(placeLinkValue, placeDescriptionValue);
  });

  return cardElement;
};

function openPopupImage(imageLink, header) {
  imagePopup.setAttribute("src", imageLink);
  imagePopup.setAttribute("alt", header);
  imageCapture.textContent = header;
  openPopup(popupImage);
}

function addItem(
  placeLinkValue,
  placeDescriptionValue,
  likes,
  myId,
  cardOwnerID,
  cardID,
  likesOwnerID
) {
  const cardElement = createCard(
    placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID
  );

  cardsContainer.prepend(cardElement);
}

export { createCard, addItem, like, deleteCardFromDom };
