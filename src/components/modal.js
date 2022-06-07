import {
  popupsCloseButtons,
  popupsAll,
  } from "./constants.js";

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


export { openPopup, closeEscPopup, closePopup };
