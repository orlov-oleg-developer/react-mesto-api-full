import { IsLoadingContext } from '../contexts/IsLoadingContext.js'
import { useContext } from 'react'

export default function PopupWithForm({ title, name, children, buttonValue, isOpen, onClose, onSubmit }) {

  const isLoading = useContext(IsLoadingContext);

  return (
    <section className={`popup popup_purpose_${name} ${isOpen ? 'popup_opened' : ''}`} aria-label="Секция с попапом">
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} className="popup__form" name={`${name}-form`}>
          {children}
          <button
            disabled={isLoading}
            type="submit"
            className="popup__button"
            name="form-button"
          >{isLoading ? 'Выполнение...' : buttonValue}</button>
        </form>
      </div>
    </section>
  )
}
