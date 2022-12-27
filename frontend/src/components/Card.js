import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import React from 'react';

export default function Card({owner, name, link, likes, _id, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `elements__trash ${isOwn ? '' : 'elements__trash_disable'}`
  );
  const cardLikeButtonClassName = `elements__element-heart ${isLiked ? 'elements__element-heart_active' : ''}`;

  function handleCardClick(card) {
    onCardClick(card);
  }

  function handleCardLike(card) {
    onCardLike(card);
  }

  function handleCardDelete(card) {
    onCardDelete(card);
  }

  return(
    <li className="elements__element">
      <div className={cardDeleteButtonClassName} onClick={ () => {handleCardDelete({_id: _id})}}/>
      <div
        className="elements__element-image"
        style={{ backgroundImage: `url(${link})` }}
        onClick={() => {handleCardClick({name: name, link: link})}}
      />
      <div className="elements__element-description">
        <h2 className="elements__element-title">{name}</h2>
        <div className="elements__element-heart-container">
          <button
            className={cardLikeButtonClassName}
            type="button" aria-label="Кнопка для лайка"
            onClick={() => {handleCardLike({likes: likes, _id: _id})}}
          />
          <p className="elements__element-likes-number">{likes.length}</p>
        </div>
      </div>
    </li>
  )
}
