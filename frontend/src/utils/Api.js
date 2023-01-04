class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
    this.token = localStorage.getItem('jwt');
    this.headers = {
      ...this.headers,
      authorization: `Bearer ${this.token}`
    }
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

  updateToken(token) {
    this.token = token;
  }
}


const api = new Api({
  baseUrl: 'https://api.orlov.developer.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api
