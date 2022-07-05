import FormValidator from "./FormValidator.js";
import "../pages/index.css";
import Section from "./section.js";
import Card from "./card";
import Api from "./api.js";

import Popup from "./popup.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
//import of constants

import {
  popupEdit,
  buttonEdit,
  buttonAdd,
  profileName,
  profileProfession,
  formProfileElement,
  nameInput,
  profileAvatar,
  professionInput,
  popupReset,
  formEdit,
  buttonElementAdd,
  inactiveButtonClassAdd,
  formElementAddCard,
  editAvatarBtn,
  editAvatarBtnActive,
  popupAvatar,
  avatarForm,
  config
} from "./constants.js";

//import of functions

//import { enableValidation, toggleButtonState } from "./validate.js";

// import { like, deleteCardFromDom } from "./card.js";


import { updateUserInfo, renderItems } from "../utils/utils.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-10/",
  headers: {
    Authorization: "8c303db7-8ccc-4a68-8cf0-1a3320479a6d",
    "Content-type": "application/json",
  },
});

let userId;

//+вызываем промисы, отрисовываем карточки и добавляем инфо о пользователе
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен:", err);
  });

//+экземпляр класса, отображающий информацию о пользователе
const userInfo = new UserInfo({
  name: ".profile__name",
  profession: ".profile__profession",
  link: ".profile__avatar",
});

//+ Создание экземпляра класса Section
const cardsList = new Section(
  {
    renderer: (card) => {
      cardsList.addItem(createCard(card));
    },
  },
  ".gallery__container"
);

// функционал создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: ".gallery__template",
    userId: userId,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    deleteHandler: (cardID) => {
      api
        .deleteCard(cardID)
        .then(() => {
          card.deleteCardFromDom();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    setLike: (cardID) => {
      api
        .setLike(cardID)
        .then((data) => {
          card.likeSwitcher(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    deleteLike: (cardID) => {
      api
        .deleteLike(cardID)
        .then((data) => {
          card.likeSwitcher(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });
  const cardElement = card.createCard();
  return cardElement;
};

/*-попап карточки  */
const handlePlaceFormSubmit = new PopupWithForm({
  popupSelector: ".popup_add",
  submitProfileForm: (popupData) => {
    handlePlaceFormSubmit.renderLoading(true);

    api
      .addCard(popupData)
      
      .then((popupData) => {
        cardsList.addItem(createCard(popupData));
        handlePlaceFormSubmit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        handlePlaceFormSubmit.renderLoading(false);
      });
  },
});
handlePlaceFormSubmit.setEventListeners();
buttonAdd.addEventListener("click", () => {
  formElementAddCardValidator.toggleButtonState();
  handlePlaceFormSubmit.open();
});

//+попап с картинкой
const popupImage = new PopupWithImage(".popup_enlarged-image");
popupImage.setEventListeners();

//попап c аватаром
const handleAvatarFormSubmit = new PopupWithForm({
  popupSelector: ".popup_avatar-edit",
  submitProfileForm: (popupData) => {
    handlePlaceFormSubmit.renderLoading(true);
    
    api
      .editAvatar(popupData)
      .then((popupData) => {
        profileAvatar.src = popupData.avatar;
        handleAvatarFormSubmit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        handlePlaceFormSubmit.renderLoading(false);
      });
  },
});

handleAvatarFormSubmit.setEventListeners();
editAvatarBtn.addEventListener("click", () => {
  avatarFormValidator.toggleButtonState();
  handleAvatarFormSubmit.open();
});

//попап с профилем
const submitProfileForm = new PopupWithForm({
  popupSelector: ".popup_edit",
  submitProfileForm: (profileData) => {
    handlePlaceFormSubmit.renderLoading(true);
    
    api
      .editProfileInfo(profileData)
      .then((profileData) => {
        userInfo.setUserInfo(profileData);

        submitProfileForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        handlePlaceFormSubmit.renderLoading(false);
      });
  },
});
submitProfileForm.setEventListeners();

//заносим данные из инпутов в профиль
function editProfileInputs({ name, about }) {
  nameInput.value = name;
  professionInput.value = about;
}

buttonEdit.addEventListener("click", () => {
  const profile = userInfo.getUserInfo();
  editProfileInputs({
    name: profile.name,
    about: profile.profession,
  });
  formProfileElementValidator.toggleButtonState();
  submitProfileForm.open();
});


function showEditBtn(editImage) {
  editImage.classList.add("profile__change-avatar_active");
}
function hiddenEditBtn(editImage) {
  editImage.classList.remove("profile__change-avatar_active");
}

editAvatarBtn.addEventListener("mouseover", () => {
  showEditBtn(editAvatarBtnActive);
});
editAvatarBtn.addEventListener("mouseout", () => {
  hiddenEditBtn(editAvatarBtnActive);
});


/*--------------------------------------------------------*/


/* Валидация форм */
// валидация формы редактирования профиля
const formProfileElementValidator = new FormValidator(config, formProfileElement);
formProfileElementValidator.enableValidation();
// валидация формы добавления новой карточки
const formElementAddCardValidator = new FormValidator(config, formElementAddCard);
formElementAddCardValidator.enableValidation();
// Валидация формы редактирования аватара пользователя
const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();