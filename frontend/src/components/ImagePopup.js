export default function ImagePopup({card, onClose, isOpen}) {
  return(
    <section className={`popup popup_purpose_full-screen ${isOpen && 'popup_opened'}`} aria-label="Секция с изображением на весь экран">
      <div className="full-screen">
        <img className="full-screen__image" src={card?.link} alt={card?.name}/>
        <p className="full-screen__description">{card?.name}</p>
        <button
          className="popup__close-button full-screen__close-button"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={onClose}
        />
      </div>
    </section>
  )
}
