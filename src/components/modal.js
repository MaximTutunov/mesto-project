import {
  popupsCloseButtons,
  popupsAll,
  nameInput,
  professionInput,
  profileName,
  profileProfession,
  popupEdit,
  profileAvatar,
  avatarInput,
  popupAvatar,
  inactiveButtonClassAdd,
} from "./constants.js";

import { editProfileInfo } from "./api.js";

import { addCard, editAvatar } from "./api.js";

import { addPrependCard } from "./card.js";

//open&close

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEscPopup);
}

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEscPopup);
}

function submitProfileForm(evt) {
  evt.preventDefault();

  
  const nameInputValue = nameInput.value;
  const profileProfessionValue = professionInput.value;
  renderLoading(true, evt);
  editProfileInfo(nameInputValue, profileProfessionValue)
    .then(() => {
      profileName.textContent = nameInputValue;
      profileProfession.textContent = profileProfessionValue;

      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен:", err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
}

//Listener Close Button

popupsCloseButtons.forEach((close) =>
  close.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  })
);
//Listener close popup on overlay clicking

popupsAll.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

function handlePlaceFormSubmit(
  evt,
  placeForm,
  placeLinkValue,
  placeDescriptionValue
) {
  
  addCard(placeLinkValue, placeDescriptionValue)
    .then((data) => {
      const like = data.likes;
      const cardOwnerID = data.owner._id;
      const cardID = data._id;
      const likesOwnerID = [];
      like.forEach((element) => {
        likesOwnerID.push(element._id);
      });
      addPrependCard(
        placeLinkValue,
        placeDescriptionValue,
        like.length,
        cardOwnerID,
        cardOwnerID,
        cardID,
        likesOwnerID
      );
    })
    .catch((err) => console.log("Ошибка. Запрос не выполнен:", err))
    .finally(() => {
      renderLoading(false, evt);
    });
}

function showEditBtn(editImage) {
  editImage.classList.add("profile__change-avatar_active");
}

function hiddenEditBtn(editImage) {
  editImage.classList.remove("profile__change-avatar_active");
}

function handleAvatarFormSubmit(evt, avatarForm) {
  evt.preventDefault();
  const avatarSrc = avatarInput.value;
  renderLoading(true, evt);
  editAvatar(avatarSrc)
    .then(() => {
      profileAvatar.src = avatarSrc;
      closePopup(popupAvatar);
      avatarForm.reset();
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен:", err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
}

function renderLoading(isLoading, evt) {
  const btn = evt.submitter;
  if (isLoading) {
    btn.textContent = "Сохранение...";
    btn.classList.remove(inactiveButtonClassAdd);
  } else {
    btn.textContent = "Сохранить";
    btn.classList.add(inactiveButtonClassAdd);
  }
}

export {
  openPopup,
  closeEscPopup,
  closePopup,
  submitProfileForm,
  handlePlaceFormSubmit,
  handleAvatarFormSubmit,
  showEditBtn,
  hiddenEditBtn,
  renderLoading,
};
