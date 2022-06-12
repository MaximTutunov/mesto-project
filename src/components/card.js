import {
  cardTemplate,
  imagePopup,
  imageCapture,
  popupImage,
  cardsContainer,
} from "./constants.js";

import { openPopup } from "./modal.js";

import { deleteCard, likeCard } from "./api.js";

function like(evt, likeShow, cardID) {

  let method ='';

  if (evt.target.classList.contains("gallery__button-liked")) {
    method = 'DELETE';
  } else {
    method = 'PUT';
  }

  likeCard(cardID, method)
    .then((data) => {
      evt.target.classList.toggle("gallery__button-liked");
      likeShow.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен:", err);
    });
}

function del(event) {
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
 if(likesOwnerID.includes(myId)){
  likeButton.classList.add('gallery__button-liked')
 }

  likeButton.addEventListener("click", function (evt) {
      like(evt, likeCount, cardID);
    });

  ///delete
  if (myId === cardOwnerID) {
    deleteButton.addEventListener("click", function (event) {
      deleteCard(cardID)
        .then(() => {
          del(event);
        })
        .catch((err) => {
          console.log("Ошибка. Запрос не выполнен:", err);
        });
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

function addPrependCard(
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

export { createCard, addPrependCard };
