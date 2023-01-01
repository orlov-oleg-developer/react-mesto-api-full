import React, { useState, useEffect, useCallback } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { IsLoadingContext } from '../contexts/IsLoadingContext.js'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js'
import { EditProfilePopup } from './EditProfilePopup.js'
import { EditAvatarPopup } from './EditAvatarPopup.js'
import { AddPlacePopup } from './AddPlacePopup.js'
import { ConfirmationPopup } from './ConfirmationPopup.js'
import { Login } from './Login.js';
import { Register } from './Register.js';
import { InfoTooltip } from './InfoTooltip.js';
import ProtectedRoute from "./ProtectedRoute";

import api from '../utils/Api.js'
import * as auth from '../utils/auth.js'

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})
  const [isSuccessRegister, setIsSuccessRegister] = useState(false)

  const history = useHistory();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoPopupOpen(false);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmationPopupOpen || isInfoPopupOpen || isImagePopupOpen;

  const handleUpdateUser = (userData) => {
    setIsLoading(true);
    api.updateUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleUpdateUserAvatar = (avatarLink) => {
    setIsLoading(true);
    api.updateUserAvater(avatarLink)
      .then((result) => {
        setCurrentUser({
          ...currentUser,
          avatar: result.avatar
        })
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleCardDelete = (card) => {
    setSelectedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  const handleConfirmationCardDelete = (card) => {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleAddCard = (card) => {
    setIsLoading(true);
    api.addCard({
      name: card.name,
      link: card.link,
    })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const cbAuthenticate = useCallback(async (token) => {
    try {
      const data = await auth.getContent(token);
      if (!data) throw new Error('Неверный токен');
      localStorage.setItem('jwt', token);
      setUserData(data.data.email);
      setIsLoggedIn(true);
      history.push('/')
    } catch (e) {
      console.log(e);
    }
  }, [])

  const cbRegister = useCallback(async ({ password, email }) => {
    try {
      const res = await auth.register({ password, email });
      if (res) {
        setIsSuccessRegister(true);
      }
    } catch (e) {
      setIsSuccessRegister(false);
    }
    setIsInfoPopupOpen(true);
  }, [])

  const cbLogin = useCallback(async ({ password, email }) => {
    try {
      const token = await auth.authorize({ password, email });
      if (token) {
        cbAuthenticate(token.token);
      }
    } catch (e) {
      setIsSuccessRegister(false);
      setIsInfoPopupOpen(true);
      console.log(e)
    } finally {
      //TODO loading
    }
  }, [cbAuthenticate])

  const cbTokenCheck = useCallback(async () => {
    try {
      let jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('no token');
      }
      cbAuthenticate(jwt);
    } catch (e) {
      console.log(e)
    }
    finally {
      //TODO loading
    }
  }, [cbAuthenticate]);

  const cbLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
  }, []);


  useEffect(() => {
    if (!isLoggedIn) return
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch((err) => {
        console.log(err);
      });

    api.getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn])

  useEffect(() => {
    function closeByEscape(event) {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoadingContext.Provider value={isLoading}>
        <div className="root">
          {isLoggedIn && <Header isLoggedIn={isLoggedIn} onSignOut={cbLogout} userData={userData} />}
          <Switch>
            <ProtectedRoute
              path="/main"
              isLoggedIn={isLoggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-up">
              <Header
                action={"Войти"}
                isLoggedIn={isLoggedIn}
                link={"sign-in"}
              />
              <Register onRegister={cbRegister} isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/sign-in">
              <Header
                action={"Регистрация"}
                isLoggedIn={isLoggedIn}
                link={"sign-up"}
              />
              <Login onLogin={cbLogin} isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/">
              {isLoggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          {isLoggedIn && <Footer />}

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUseravatar={handleUpdateUserAvatar} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddCard} />

          <ConfirmationPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} card={selectedCard} handleConfirmationCardDelete={handleConfirmationCardDelete} />

          <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isSuccessRegister={isSuccessRegister}
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </IsLoadingContext.Provider>
    </CurrentUserContext.Provider>
  );
}
