
export default class UserInfo {
    constructor({ name, profession, link }) {
        this._name = document.querySelector(name);
        this._profession = document.querySelector(profession);
        this._link = document.querySelector(link);
    }

    // возвращает объект с данными пользователя
    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            profession: this._profession.textContent,
            link: this._link.src
        }
        return userInfo;
    }

    // принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._profession.textContent = data.profession;
        this._link.src = data.link;
    }
}