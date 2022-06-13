import {
  profileName,
  profileProfession,
  profileAvatar,
} from "../components/constants.js";
import { addItem } from "../components/card.js";
export const updateUserInfo = (userData, cardsData) => {
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
