import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { useContext} from 'react'
import Card from './Card';

export default function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content root__content">
      <section className="profile content__profile" aria-label="Секция с профилем">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about }</p>
          <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Кнопка редактирования профиля"/>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Кнопка добавления карточки"/>
      </section>
      <section className="elements content__elements" aria-label="Секция с фотографиями">
        <ul className="elements__list">
          {cards.map(({_id, ...props}) => (
            <Card
              key={_id}
              _id={_id}
              {...props}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
