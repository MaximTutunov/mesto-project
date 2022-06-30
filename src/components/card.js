import {
  cardTemplate,
  imagePopup,
  imageCapture,
  popupImage,
  cardsContainer,
} from "./constants.js";

import { openPopup } from "./modal.js";

import { api } from "../utils/utils.js";

/*function like(evt, likeShow, data) {
  evt.target.classList.toggle("gallery__button-liked");
  likeShow.textContent = data.likes.length;
  if (data.likes.length < 1) {
    likeShow.textContent = "";
  }
}*/

/*function deleteCardFromDom(event) {
  const target = event.target;
  target.closest(".gallery__item").remove();
}*/

class Card {
  constructor(
    placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID,
    { handleCardClick },
    { likeHandler },
    { deleteHandler }
  ) {
    this.placeLinkValue = placeLinkValue;
    this.placeDescriptionValue = placeDescriptionValue;
    this.likes = likes;
    this.myId = myId;
    this.cardOwnerID = cardOwnerID;
    this.cardID = cardID;
    this.likesOwnerID = likesOwnerID;
    this.handleCardClick = handleCardClick;
    this.likeHandler = likeHandler;
    this.deleteHandler = deleteHandler;

    //consts

    this.cardElement = cardTemplate
      .querySelector(".gallery__item")
      .cloneNode(true);
    this.cardImage = this.cardElement.querySelector(".gallery__photo");
    this.likeCount = this.cardElement.querySelector(".gallery__likes-counter");
    this.deleteButton = this.cardElement.querySelector(".gallery__button-del");
    this.likeButton = this.cardElement.querySelector(".gallery__button-like");
  }

  
  deleteCardFromDom(event) {
    const target = event.target;
    target.closest(".gallery__item").remove();
  }

  like(evt, likeShow, data) {
    evt.target.classList.toggle("gallery__button-liked");
    likeShow.textContent = data.likes.length;
    if (data.likes.length < 1) {
      likeShow.textContent = "";
    }
  }

  /*
  like(evt, likeShow, data) {
  evt.target.classList.toggle("gallery__button-liked");
  likeShow.textContent = data.likes.length;
  if (data.likes.length < 1) {
    likeShow.textContent = "";
  }
}

 deleteCardFromDom (event) {
  const target = event.target;
  target.closest(".gallery__item").remove();
}*/

  createCard(
    placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID
  ) {
    this.cardElement.querySelector(".gallery__caption").textContent =
      placeDescriptionValue;
    this.cardImage.setAttribute("src", placeLinkValue);
    this.cardImage.setAttribute("alt", placeDescriptionValue);

    //if like is 0 then hidden likes
    if (likes > 0) {
      this.likeCount.textContent = `${likes}`;
    } else {
      this.likeCount.textContent = "";
    }

    // setting LIKES
    if (likesOwnerID.includes(myId)) {
      this.likeButton.classList.add("gallery__button-liked");
    }

    this.likeButton.addEventListener("click", (evt) => {
      this.likeHandler(evt, cardID, this.likeCount);
    });

    ///delete
    if (myId === cardOwnerID) {
      this.deleteButton.addEventListener("click", (event) => {
        this.deleteHandler(event, cardID);
      });
    } else {
      this.deleteButton.remove();
    }

    this.cardImage.addEventListener("click", () => {
      this.handleCardClick(placeLinkValue, placeDescriptionValue);
    });

    return this.cardElement;
  }
}

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

  cardsContainer.prepend(cardElement);
}

/*function CL (smth) {
  console.log(smth);
}*/

export { addItem };
