export default class Card {
  constructor({
    data,
    userId,
    cardSelector,
    handleCardClick,
    likeHandler,
    deleteLike,
    setLike,
    deleteHandler,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._cardOwnerID = data.owner._id;
    this._cardID = data._id;
    this._handleCardClick = handleCardClick;
    this._likeHandler = likeHandler;
    this._deleteHandler = deleteHandler;
    this._cardSelector = cardSelector;
    this._deleteLike = deleteLike;
    this._setLike = setLike;
  }

  //берем tmplate елемента
  _getTemplate() {
    this._templatElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);
    return this._templatElement;
  }

  //создаем метод создания карточки
  createCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".gallery__photo");
    this._likeCount = this._cardElement.querySelector(
      ".gallery__likes-counter"
    );
    this._deleteButton = this._cardElement.querySelector(
      ".gallery__button-del"
    );
    this._likeButton = this._cardElement.querySelector(".gallery__button-like");
    this._cardElement.querySelector(".gallery__caption").textContent =
      this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount.textContent = this._likes.length;
    this._hasdeleteButton();
    this._deleteZeroLikes();
    this._isOwnerLike();
    this._setEventListeners();
    return this._cardElement;
  }

  //если карточку не создал юсер, убираем кнопку удаления
  _hasdeleteButton() {
    if (this._userId !== this._cardOwnerID) {
      this._deleteButton.remove();
    }
  }

  // Метод удаления карточки
  deleteCardFromDom() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //если лайков 0, то убираем счетчик
  _deleteZeroLikes() {
    if (this._likes.length > 0) {
      this._likeCount.textContent = `${this._likes.length}`;
    } else {
      this._likeCount.textContent = "";
    }
  }

  //если лайк поставил юсер, то закрашиваем
  _isOwnerLike() {
    if (this._likes.some((elem) => this._userId === elem._id)) {
      this._likeButton.classList.add("gallery__button-liked");
    }
  }

  // поставить/удалить лайк, изменение количества лайков
  likeSwitcher(data) {
    this._likes = data.likes;
    if (this._likes.length > 0) {
      this._likeCount.textContent = this._likes.length;
    } else {
      this._likeCount.textContent = "";
    }
    this._likeButton.classList.toggle("gallery__button-liked");
  }

  //слушатель
  _setEventListeners() {
    //слушатель попапа с картинкой
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    // слушатель кнопки удаления карточки
    this._deleteButton.addEventListener("click", () => {
      this._deleteHandler(this._cardID);
    });
    //слушатель лайка
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("gallery__button-liked")) {
        this._deleteLike(this._cardID);
      } else {
        this._setLike(this._cardID);
      }
    });
  }
}
