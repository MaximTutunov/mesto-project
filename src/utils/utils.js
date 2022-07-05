import {
  profileName,
  profileProfession,
  profileAvatar,
  
} from "../components/constants.js";
// import { addItem } from "../components/card.js";
import {  likeCard, deleteCard, config, Api} from "../components/Api.js";


// export const api = new Api (config);

/*export const updateUserInfo = (userData, cardsData) => {
  profileName.textContent = userData.name;
  profileProfession.textContent = userData.about;
  profileAvatar.src = userData.avatar;
  cardsData.reverse();
};

export const renderItems = (userData, cardsData) => {
  for (let i = 0; i < cardsData.length; i++) {
    const like = cardsData[i].likes;
    const cardOwnerID = cardsData[i].owner._id;
    const cardID = cardsData[i]._id;
    const likesOwnerID = [];

    like.forEach((element) => {
      likesOwnerID.push(element._id);
    });
    addItem(
      cardsData[i].link,
      cardsData[i].name,
      like.length,
      userData._id,
      cardOwnerID,
      cardID,
      likesOwnerID
    );
  }
};
/*
export const likeHandler = (evt, cardID, likeCount) => {
  let method = "";
  if (evt.target.classList.contains("gallery__button-liked")) {
    method = "DELETE";
  } else {
    method = "PUT";
  }
  likeCard(cardID, method)
    .then((data) => {
      like(evt, likeCount, data);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: из индекс", err);
    });
};*/
/*
export const deleteHandler = (event, cardID) => {
  deleteCard(cardID)
    .then(() => {
      deleteCardFromDom(event);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен:", err);
    });
};*/

/*export const likeHandler = (evt, cardID, likeCount) => {
  let method = "";
  if (evt.target.classList.contains("gallery__button-liked")) {
    method = "DELETE";
  } else {
    method = "PUT";
  }
  api.likeCard(cardID, method)
    .then((data) => {
      like(evt, likeCount, data);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: из индекс", err);
    });
};

export const deleteHandler = (event, cardID) => {
  api.deleteCard(cardID)
    .then(() => {
      deleteCardFromDom(event);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};*/
