class Api {

  constructor (options) {
    this.options = options;
  }

  #checkPromiseResult (res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  // Действия с профилем пользователя
  getUserProfileApi () {
    return fetch(`${this.options.baseUrl}/users/me `, {
      headers: this.options.headers
    })
    .then(this.#checkPromiseResult)
  }

  setUserProfileInfoApi (userData) {
    return fetch(`${this.options.baseUrl}/users/me `, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this.#checkPromiseResult)
  }

  setUserProfileAvatarApi (avatarLink) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
    .then(this.#checkPromiseResult)
  }

  // Действия с карточками
  getCardsApi () {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers
    })
    .then(this.#checkPromiseResult)
  }

  setCardApi (cardData) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this.#checkPromiseResult)
  }

  removeCardApi (cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers
    })
    .then(this.#checkPromiseResult)
  }

  setCardLikeApi (cardID, connectionMethod) {
    return fetch(`${this.options.baseUrl}/cards/likes/${cardID}`, {
      method: connectionMethod,
      headers: this.options.headers
    })
    .then(this.#checkPromiseResult)
  }

};
export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: '3666373c-6595-416d-b8ae-f698299c29e7',
    'Content-Type': 'application/json'
  }
});