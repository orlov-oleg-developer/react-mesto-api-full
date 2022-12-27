import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm"

export function EditAvatarPopup ({isOpen, onClose, onUpdateUseravatar}) {

  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUseravatar(inputRef.current.value);
  };

  useEffect(() => {
    if(isOpen) inputRef.current.value = '';
  }, [isOpen]);

  return(
    <PopupWithForm
      title='Обновить аватар'
      name='update-profile-avater'
      buttonValue="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
        <label className="popup__form-field">
            <input
              className="popup__input"
              ref={inputRef}
              id="update-link-input"
              type="url" name="form-link-input"
              placeholder="Ссылка на новый аватар"
              required
            />
            <span className="popup__input-error update-link-input-error"/>
        </label>
    </PopupWithForm>
  )
}

