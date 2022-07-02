
export default class Api {
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
      }).then((res) => this._checkResponse(res));
    }

   //добавляем лайк карточке
 setLike (cardID) {
  return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: this._headers,
  }).then((answ) => this._checkResponse(answ));
};

//удаляем лайк
 deleteLike (cardID)  {
  return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: this._headers,
  }).then((answ) => this._checkResponse(answ));
};



     getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, { headers: this._headers }).then(
        this._checkResponse
      );
    }
    
    getCards() {
      return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
        this._checkResponse
      );
    }

     editAvatar (data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }).then(this._checkResponse);
    }

     addCard (data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this._checkResponse);
    }

     editProfileInfo(data) {
      return fetch(`${this._baseUrl}users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then(this._checkResponse);
    }
}