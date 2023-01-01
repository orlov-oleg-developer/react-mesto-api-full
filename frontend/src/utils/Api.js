class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserInfo() {
    return this._request(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
  }

  updateUserInfo(profileData) {
    return this._request(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
      })
    })
  }

  updateUserAvater(link) {
    return this._request(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
  }

  getCards() {
    return this._request(`${this.url}/cards`, {
      method: "GET",
      headers: this.headers,
    })
  }

  addCard(cardData) {
    return this._request(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      })
    })
  }

  deleteCard(cardID) {
    return this._request(`${this.url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
    })
  }

  likeCard(cardID) {
    return this._request(`${this.url}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this.headers,
    })
  }

  unLikeCard(cardID) {
    return this._request(`${this.url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
  }

  changeLikeCardStatus(cardID, like) {
    return (like ? this.likeCard(cardID) : this.unLikeCard(cardID))
  }
}

const token = '7c9aaef8-fca1-4895-a514-2f3e57cf38aa';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

export default api
