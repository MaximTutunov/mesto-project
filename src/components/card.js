import {
  cardTemplate,
  imagePopup,
  imageCapture,
  popupImage,
  cardsContainer,
} from "./constants.js";

import { openPopup } from "./modal.js";

import { api } from "../utils/utils.js";
import { data } from "autoprefixer";

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

export default class Card {
  constructor({
    data,
    myId,
    cardSelector,
    likesOwnerID,
    handleCardClick,
    likeHandler,
    likeRemove,
    deleteHandler,
  }) {
    this._name = data._name;
    this._link = data.link;
    this._likes = data.likes;
    this.placeDescriptionValue = placeDescriptionValue; 
    this._myId = myId;
    this._cardOwnerID = data.owner._id;
    this._cardID = data._id;
    this._likesOwnerID = likesOwnerID;
    this._handleCardClick = handleCardClick;
    this._likeHandler = likeHandler;
    this._deleteHandler = deleteHandler;
    this._cardSelector = cardSelector;
    this._likeRemove = likeRemove;
    this._likeSet = likeSet;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    return this._cardElement;
  }

  createCard() {
    _setEventListeners();
    this._element = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".gallery__photo");
    this._likeCount = this._cardElement.querySelector(".gallery__likes-counter");
    this._deleteButton = this._cardElement.querySelector(".gallery__button-del");
    this._likeButton = this._cardElement.querySelector(".gallery__button-like");
    this._cardElement.querySelector(".gallery__caption").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount.textContent = this._likes.length;
    this._hasdeleteButton();
    this._deleteZeroLikes();
    this._isOwnerLike();
    this._setEventListeners();
     }

   _hasdeleteButton(){
    if (this._myId !== this._cardOwnerID){
        this.deleteButton.remove();
    }
  }

  //Метод удаления карточки
  deleteCardFromDom(){
    this._cardElement.remove();
    this._cardElement = null;
  }

  _deleteZeroLikes(){
    if (this._likes.length > 0) {
      this._likeCount.textContent = `${this._likes.length}`;
    } else {
      this.likeCount.textContent = "";
    }
  }
//проверка владельца
  _isOwnerLike(){
    if (this._likesOwnerID.includes(this._myId)) {
      this._likeButton.classList.add("gallery__button-liked");
    }
  }
//слушатель
  _setEventListeners(){
    //слушатель кнопки лайк
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("gallery__button-liked")){
        this._likeRemove(this._cardID);
      } else {
    this._likeSet(this._cardID);
  }});
//слушатель попапа с картинкой
    this._cardImage.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
  })

  //слушатель кнопки удаления карточки
  this._deleteButton.addEventListener('click', () => {
    this._deleteHandler(this._cardID)
  }) 
  }
  
 
  likeHandler(data) {
    this._likes = data.likes;
    this._likeButton.classList.toggle("gallery__button-liked");
    this._likeCount.textContent = this._likes.length;
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
