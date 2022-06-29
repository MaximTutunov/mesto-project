import {
  cardTemplate,
  imagePopup,
  imageCapture,
  popupImage,
  cardsContainer,
} from "./constants.js";

import { openPopup } from "./modal.js";

import { deleteHandler, likeHandler } from "../utils/utils.js";

function like(evt, likeShow, data) {
  evt.target.classList.toggle("gallery__button-liked");
  likeShow.textContent = data.likes.length;
  if (data.likes.length < 1) {
    likeShow.textContent = "";
  }
}

function deleteCardFromDom(event) {
  const target = event.target;
  target.closest(".gallery__item").remove();
}


class Card {
  constructor(
    placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID, 
    {handleCardClick}
  ) {
    this.placeLinkValue = placeLinkValue;
    this.placeDescriptionValue = placeDescriptionValue;
    this.likes = likes;
    this.myId = myId;
    this.cardOwnerID = cardOwnerID;
    this.cardID = cardID;
    this.likesOwnerID = likesOwnerID;
   this.handleCardClick = handleCardClick;
    //consts

    this.cardElement = cardTemplate
      .querySelector(".gallery__item")
      .cloneNode(true);
    this.cardImage = this.cardElement.querySelector(".gallery__photo");
    this.likeCount = this.cardElement.querySelector(".gallery__likes-counter");
    this.deleteButton = this.cardElement.querySelector(".gallery__button-del");
    this.likeButton = this.cardElement.querySelector(".gallery__button-like");
  }

 CL (smth) {
  console.log(smth);
 }
  
/* handleImageClick (){
  this.handleCardClick(this.myId)
 }*/

  createCard(
    placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID, 
   
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

    this.likeButton.addEventListener("click", function (evt) {
      likeHandler(evt, cardID, likeCount);
    });

    ///delete
    if (myId === cardOwnerID) {
      this.deleteButton.addEventListener("click", function (event) {
        deleteHandler(event, cardID);
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
  likesOwnerID,
  
) {
  

  const card = new Card(
    placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID,
   
   {handleCardClick: (imageLink, header) => {
      openPopupImage(imageLink, header);}
    }
  );
 
  const cardElement =card.createCard(
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



export {  addItem, like, deleteCardFromDom };
