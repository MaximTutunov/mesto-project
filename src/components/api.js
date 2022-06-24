const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-10/",
  headers: {
    Authorization: "8c303db7-8ccc-4a68-8cf0-1a3320479a6d",
    "Content-type": "application/json",
  },
};

export class Api {
  constructor(config){
      this._baseUrl = config.baseUrl;
      this._headers = config.headers;
    }

    deleteCard(cardID) {
      return fetch(`${this._baseUrl}cards/${cardID}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(checkResponse);
    }

    likeCard(cardID, method) {
      return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
        method: method,
        headers: this._headers,
      }).then(checkResponse);
    }
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

function getUserInfo() {
  return fetch(`${config.baseUrl}users/me`, { headers: config.headers }).then(
    checkResponse
  );
}

function getCards() {
  return fetch(`${config.baseUrl}cards`, { headers: config.headers }).then(
    checkResponse
  );
}
/*
function deleteCard(cardID) {
  return fetch(`${config.baseUrl}cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}
*/
function editProfileInfo(nameInputValue, professionInputValue) {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: `${nameInputValue}`,
      about: `${professionInputValue}`,
    }),
  }).then(checkResponse);
}

function addCard(placeLinkValue, placeDescriptionValue) {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: `${placeDescriptionValue}`,
      link: `${placeLinkValue}`,
    }),
  }).then(checkResponse);
}

/*function likeCard(cardID, method) {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: method,
    headers: config.headers,
  }).then(checkResponse);
}
*/
function editAvatar(avatarInputValue) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarInputValue}`,
    }),
  }).then(checkResponse);
}

export {
  getUserInfo,
  getCards,
  editProfileInfo,
  addCard,
  config,
  
  
  editAvatar,
};
