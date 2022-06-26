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
    
    _checkResponse = (res) => {
      return res.ok ? res.json() : Promise.reject(res);
    };

    deleteCard(cardID) {
      return fetch(`${this._baseUrl}cards/${cardID}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }

    likeCard(cardID, method) {
      return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
        method: method,
        headers: this._headers,
      }).then(this._checkResponse);
    }
     getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, { headers: this._headers }).then(
        this._checkResponse
      );
    }
    
    getCards() {
      return fetch(`${this._baseUrl}cards`, { headers: this._headers }).then(
        this._checkResponse
      );
    }

     editAvatar(avatarInputValue) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: `${avatarInputValue}`,
        }),
      }).then(this._checkResponse);
    }

     addCard(placeLinkValue, placeDescriptionValue) {
      return fetch(`${this._baseUrl}cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: `${placeDescriptionValue}`,
          link: `${placeLinkValue}`,
        }),
      }).then(this._checkResponse);
    }

     editProfileInfo(nameInputValue, professionInputValue) {
      return fetch(`${this._baseUrl}users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: `${nameInputValue}`,
          about: `${professionInputValue}`,
        }),
      }).then(this._checkResponse);
    }
}

// const checkResponse = (res) => {
//   return res.ok ? res.json() : Promise.reject(res);
// };

// function getUserInfo() {
//   return fetch(`${config.baseUrl}users/me`, { headers: config.headers }).then(
//     checkResponse
//   );
// }

// function getCards() {
//   return fetch(`${config.baseUrl}cards`, { headers: config.headers }).then(
//     checkResponse
//   );
// }
/*
function deleteCard(cardID) {
  return fetch(`${config.baseUrl}cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}
*/
// function editProfileInfo(nameInputValue, professionInputValue) {
//   return fetch(`${config.baseUrl}users/me`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: `${nameInputValue}`,
//       about: `${professionInputValue}`,
//     }),
//   }).then(checkResponse);
// }

// function addCard(placeLinkValue, placeDescriptionValue) {
//   return fetch(`${config.baseUrl}cards`, {
//     method: "POST",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: `${placeDescriptionValue}`,
//       link: `${placeLinkValue}`,
//     }),
//   }).then(checkResponse);
// }

/*function likeCard(cardID, method) {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: method,
    headers: config.headers,
  }).then(checkResponse);
}
*/

// function editAvatar(avatarInputValue) {
//   return fetch(`${config.baseUrl}users/me/avatar`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar: `${avatarInputValue}`,
//     }),
//   }).then(checkResponse);
// }

export {
  config,
};
