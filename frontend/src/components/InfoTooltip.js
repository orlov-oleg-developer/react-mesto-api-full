import SuccessPath from '../images/Success.svg'
import FailPath from '../images/Fail.svg'

export function InfoTooltip({ isSuccessRegister, isOpen, onClose }) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`} aria-label="Секция с попапом">
      <div className="popup__container popup__container_purpose_info">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={onClose}
        />
        <img className="popup__image" src={isSuccessRegister ? SuccessPath : FailPath} alt="Иконка резудьтата" />
        <h2 className="popup__title popup__title_place_info">{
          isSuccessRegister ?
            "Вы успешно зарегистрировались!" :
            "Что-то пошло не так!\n" +
          "Попробуйте ещё раз."
        }</h2>
      </div>
    </section>
  )
}
